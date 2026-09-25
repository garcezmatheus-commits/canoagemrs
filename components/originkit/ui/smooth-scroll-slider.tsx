"use client"

// Adaptado do Smooth Scroll Slider (Originkit): roda vertical livre, pausa fora da tela, foto só ao aparecer e teclado.

import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import type { CSSProperties, KeyboardEvent, Ref } from "react"

type ImageValue = string | { src?: string; alt?: string } | null | undefined

type ImageInput = ImageValue | { image?: ImageValue; offsetY?: number }

interface Slide {
    src: string | null
    alt: string
    offsetY: number
}

export interface SmoothScrollSliderProps {
    images?: ImageInput[]

    slideWidth?: number
    slideHeight?: number

    spacing?: number
    direction?: "right" | "left"

    smoothness?: number

    radius?: number
    dim?: number
    background?: string

    sensitivity?: number
    loop?: boolean
    label?: string
    style?: CSSProperties
    ref?: Ref<SliderHandle>
}

export interface SliderHandle {
    move: (direction: 1 | -1) => void
}

const PLACEHOLDER_COUNT = 8

const MAX_SCALE = 2.5
const MIN_SCALE = 0.1

function wrap(value: number, span: number): number {
    return ((value % span) + span) % span
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

function resolveImage(value: ImageValue): { src: string; alt: string } | null {
    if (!value) return null
    if (typeof value === "string") return value ? { src: value, alt: "" } : null
    const src = value.src
    return typeof src === "string" && src ? { src, alt: value.alt ?? "" } : null
}

function imageOf(item: ImageInput): { src: string; alt: string } | null {
    if (item && typeof item === "object" && "image" in item)
        return resolveImage(item.image)
    return resolveImage(item as ImageValue)
}

function offsetOf(item: ImageInput): number {
    if (item && typeof item === "object" && "offsetY" in item) {
        const offset = item.offsetY
        return typeof offset === "number" && isFinite(offset) ? offset : 0
    }
    return 0
}

function placeholderFill(index: number): string {
    const hue = (index * 47 + 210) % 360
    return `linear-gradient(150deg, hsl(${hue} 42% 34%), hsl(${
        (hue + 45) % 360
    } 55% 10%))`
}

interface Frame {
    count: number
    step: number
    slideWidth: number
    width: number
    ease: number
    maxScale: number
    minScale: number
    dim: number
    loop: boolean
    flip: boolean
}

export default function SmoothScrollSlider({
    images = [],
    slideWidth = 400,
    slideHeight = 400,
    spacing = 2,
    direction = "right",
    smoothness = 10,
    radius = 16,
    dim = 10,
    background = "#000000",
    sensitivity = 5,
    loop = true,
    label = "Galeria de fotos",
    style,
    ref,
}: SmoothScrollSliderProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const nodes = useRef<(HTMLDivElement | null)[]>([])
    const target = useRef(0)
    const current = useRef(0)
    const [width, setWidth] = useState(0)

    const source = useMemo<Slide[]>(() => {
        const resolved: Slide[] = []
        for (const item of images ?? []) {
            const image = imageOf(item)
            if (image) resolved.push({ ...image, offsetY: offsetOf(item) })
        }
        return resolved.length
            ? resolved
            : Array.from({ length: PLACEHOLDER_COUNT }, () => ({
                  src: null,
                  alt: "",
                  offsetY: 0,
              }))
    }, [images])

    const step = slideWidth + clamp(spacing, 0, 10) * 20
    const ease = 0.15 - (clamp(smoothness, 0, 10) / 10) * 0.13
    const dimAmount = (clamp(dim, 0, 10) / 10) * 0.85
    const wheelMultiplier = 0.4 + (clamp(sensitivity, 0, 10) / 10) * 1.2
    const dragMultiplier = 0.6 + (clamp(sensitivity, 0, 10) / 10) * 1.8

    const flip = direction === "left"

    const repeats = useMemo(() => {
        if (!loop || width <= 0 || step <= 0) return 1
        return Math.max(1, Math.ceil((width + step * 2) / (source.length * step)))
    }, [loop, width, step, source.length])

    const slides = useMemo(() => {
        const out: Slide[] = []
        for (let r = 0; r < repeats; r += 1) out.push(...source)
        return out
    }, [source, repeats])

    const frame = useRef<Frame>({
        count: 0,
        step: 0,
        slideWidth: 0,
        width: 0,
        ease: 0.075,
        maxScale: MAX_SCALE,
        minScale: MIN_SCALE,
        dim: 0,
        loop: true,
        flip: false,
    })
    const input = useRef({ wheelMultiplier, dragMultiplier, flip, step })

    // Os valores do render chegam ao loop de animação por refs, atualizadas depois do commit.
    useEffect(() => {
        frame.current = {
            count: slides.length,
            step,
            slideWidth,
            width,
            ease,
            maxScale: MAX_SCALE,
            minScale: MIN_SCALE,
            dim: dimAmount,
            loop,
            flip,
        }
        input.current = { wheelMultiplier, dragMultiplier, flip, step }
    })

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width)
        })
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        nodes.current.length = slides.length
    }, [slides.length])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        let raf = 0
        let last = 0
        let running = false

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick)
            const c = frame.current
            const delta = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60
            last = now
            if (!c.count || c.step <= 0 || c.width <= 0) return

            const span = c.count * c.step

            if (c.loop) {
                if (current.current > span || current.current < -span) {
                    const shift = Math.trunc(current.current / span) * span
                    current.current -= shift
                    target.current -= shift
                }
            } else {
                target.current = clamp(target.current, 0, (c.count - 1) * c.step)
            }

            const k = 1 - Math.pow(1 - c.ease, delta * 60)
            current.current += (target.current - current.current) * k

            const pad = (c.width - c.slideWidth) / 2
            const half = c.width / 2

            for (let i = 0; i < c.count; i += 1) {
                const slide = nodes.current[i]
                if (!slide) continue

                const raw = i * c.step - current.current + pad

                const x = c.loop ? wrap(raw + c.step, span) - c.step : raw

                const distance = x + c.slideWidth / 2 - half
                let scale: number
                let push: number
                if (distance > 0) {
                    scale = Math.min(c.maxScale, 1 + distance / c.width)

                    push = (scale - 1) * c.slideWidth * 0.75
                } else {
                    scale = Math.max(c.minScale, 1 + distance / c.width)
                    push = 0
                }

                const left = c.flip ? c.width - c.slideWidth - (x + push) : x + push
                slide.style.transform = `translate3d(${left}px, -50%, 0) scale(${scale})`

                // A foto é pedida um slide antes de entrar na área visível (o scale amplia o slide para fora do left).
                const img = slide.firstElementChild as HTMLImageElement | null
                if (img?.dataset.src && !img.getAttribute("src") && left < c.width + c.slideWidth && left + c.slideWidth * scale > -c.slideWidth)
                    img.src = img.dataset.src

                if (c.dim > 0 && scale < 1) {
                    const t = (1 - scale) / Math.max(0.001, 1 - c.minScale)
                    slide.style.filter = `brightness(${1 - t * c.dim})`
                } else {
                    slide.style.filter = "none"
                }
            }
        }

        const start = () => {
            if (running) return
            running = true
            last = 0
            raf = requestAnimationFrame(tick)
        }
        const stop = () => {
            running = false
            cancelAnimationFrame(raf)
        }

        // Só anima enquanto a galeria está na tela.
        const visibility = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { rootMargin: "400px" }
        )
        visibility.observe(node)
        return () => {
            visibility.disconnect()
            stop()
        }
    }, [])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        // Só gesto horizontal move o slider; sem Lenis, capturar a roda vertical travava a página.
        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
            event.preventDefault()
            target.current += event.deltaX * input.current.wheelMultiplier
        }
        node.addEventListener("wheel", onWheel, { passive: false })
        return () => node.removeEventListener("wheel", onWheel)
    }, [])

    useEffect(() => {
        const node = containerRef.current
        if (!node) return
        let pointer: number | null = null
        let lastX = 0

        const onDown = (event: PointerEvent) => {
            if (pointer !== null) return
            pointer = event.pointerId
            lastX = event.clientX
            node.setPointerCapture(event.pointerId)
        }
        const onMove = (event: PointerEvent) => {
            if (pointer !== event.pointerId) return
            const dx = event.clientX - lastX
            lastX = event.clientX
            target.current += (input.current.flip ? dx : -dx) * input.current.dragMultiplier
        }
        const onUp = (event: PointerEvent) => {
            if (pointer !== event.pointerId) return
            pointer = null
            if (node.hasPointerCapture(event.pointerId))
                node.releasePointerCapture(event.pointerId)
        }

        node.addEventListener("pointerdown", onDown)
        node.addEventListener("pointermove", onMove)
        node.addEventListener("pointerup", onUp)
        node.addEventListener("pointercancel", onUp)
        return () => {
            node.removeEventListener("pointerdown", onDown)
            node.removeEventListener("pointermove", onMove)
            node.removeEventListener("pointerup", onUp)
            node.removeEventListener("pointercancel", onUp)
        }
    }, [])

    const move = (direction: 1 | -1) => {
        target.current += direction * (input.current.flip ? -1 : 1) * input.current.step
    }
    useImperativeHandle(ref, () => ({ move }))

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
        event.preventDefault()
        move(event.key === "ArrowRight" ? 1 : -1)
    }

    return (
        <div
            ref={containerRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label={label}
            tabIndex={0}
            onKeyDown={onKeyDown}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background,
                cursor: "grab",
                touchAction: "pan-y",
                opacity: width > 0 ? 1 : 0,
                transition: "opacity 0.35s ease",
                ...style,
            }}
        >
            {slides.map((slide, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        nodes.current[i] = el
                    }}
                    aria-hidden={i >= source.length ? true : undefined}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: slideWidth,
                        height: slideHeight,
                        borderRadius: radius,
                        overflow: "hidden",
                        background: slide.src ? "#111" : placeholderFill(i),
                        willChange: "transform, filter",
                        transform: "translate3d(0, -50%, 0)",
                        pointerEvents: "none",
                    }}
                >
                    {slide.src ? (
                        // eslint-disable-next-line @next/next/no-img-element -- slide absoluto e transformado; next/image não acrescenta nada aqui
                        <img
                            data-src={slide.src}
                            alt={slide.alt}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",

                                objectPosition: `50% calc(50% + ${slide.offsetY}px)`,
                                display: "block",
                                userSelect: "none",
                            }}
                        />
                    ) : null}
                </div>
            ))}
        </div>
    )
}
