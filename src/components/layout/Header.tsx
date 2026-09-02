import { Bell, Search } from 'lucide-react';

export function Header(){
    return(
        <header className='flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6'>
            {/*content content content*/}
            <div className='relative w-full max-w-md'>
                <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
                <input type='text' placeholder='Search...' className='w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'/>
            </div>
            <div className='flex item-center gap-4'>
                <button>
                    <Bell size={19} />
                </button>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white'>
                    PL
                </div>
            </div>
        </header>
    )
}