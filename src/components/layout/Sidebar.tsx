import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../data/navigation";

export function Sidebar(){
    return(
        <aside className="flex w-64 flex-col bg-slate-950 px-4 py-5 text-slate-300">
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white">
                    PLR
                </div>
                <span className="text-lg font-semibold text-white">
                    Planora
                </span>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return(
                        <NavLink to={item.path} key={item.label} end={item.path === "/"} className={({ isActive }) => 
                        `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${ isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
                            <Icon size ={18}/>
                            {item.label}
                        </NavLink>
                    )
                })}
            </nav>

            <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-slate-800 hover:text-white">
                <Settings size={18}/>
                Settings
            </button>

        </aside>
    );
}