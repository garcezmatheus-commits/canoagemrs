import HomeExperience from '@/components/home-experience';
import {entries} from '@/lib/acervo';
export default function Home(){
 const lean=(id:number)=>{const entry=entries.find(e=>e.id===id)!;return {...entry,search:''}};
 return <HomeExperience news={[1992,2169,2073].map(lean)} events={[2169,2132,2104].map(lean)} latest={entries.filter(e=>e.type==='post').slice(0,3).map(e=>({...e,search:''}))}/>;
}
