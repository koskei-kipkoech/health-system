import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCalendar, FaUserPlus, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { 
  Menu, ChevronLeft, ChevronRight, Users, Search, UserPlus, 
  ListPlus, FileText, PlusCircle, Home
} from 'lucide-react';

export default function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { href: '/clients', icon: <Users size={20} />, label: 'Clients' }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex mt-15 h-screen">
      {/* Main sidebar */}
      <div className={`bg-black/95 text-white transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-700">
          {isOpen && <h2 className="text-xl mt-5 font-semibold">Med Portal</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-slate-700">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 transition-colors ${pathname === item.href ? 'bg-amber-700/50 text-amber-400' : 'hover:bg-slate-700'}`}
                >
                  {item.icon}
                  {isOpen && <span className="ml-4">{item.label}</span>}
                </a>
              </li>
            ))}

            <li>
              <a
                href="/clients/register"
                className={`flex items-center px-4 py-3 transition-colors ${pathname === '/clients/register' ? 'bg-amber-700/50 text-amber-400' : 'hover:bg-slate-700'}`}
              >
                <UserPlus size={20} />
                {isOpen && <span className="ml-4">Register Client</span>}
              </a>
            </li>
            <li>
              <a
                href="/programs/enrollment"
                className={`flex items-center px-4 py-3 transition-colors ${pathname === '/programs/enrollment' ? 'bg-amber-700/50 text-amber-400' : 'hover:bg-slate-700'}`}
              >
                <ListPlus size={20} />
                {isOpen && <span className="ml-4">Program Enrollment</span>}
              </a>
            </li>

            <li>
              <a
                href="/programs/create"
                className={`flex items-center px-4 py-3 transition-colors ${pathname === '/programs/create' ? 'bg-amber-700/50 text-amber-400' : 'hover:bg-slate-700'}`}
              >
                <PlusCircle size={20} />
                {isOpen && <span className="ml-4">Create Program</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* User profile at bottom */}
        <div className="p-5 mb-10 border-t border-amber-700/50 transition-all duration-300 hover:bg-slate-800/50">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-medium shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-amber-500/25">
              {user?.name?.[0] || '?'}
            </div>
            {isOpen && user && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-amber-400/80 truncate">{user.specialization}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}