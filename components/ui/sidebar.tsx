import { useState } from 'react';
import { FaHome, FaUser, FaCalendar, FaUserPlus, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { 
  Menu, ChevronLeft, ChevronRight, Users, Search, UserPlus, 
  ListPlus, FileText, PlusCircle, Home
} from 'lucide-react';

export default function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(true);

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
          {isOpen && <h2 className="text-xl font-semibold">Med Portal</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-slate-700">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors">
                  {item.icon}
                  {isOpen && <span className="ml-4">{item.label}</span>}
                </a>
              </li>
            ))}

            <li>
              <a href="/clients/register" className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors">
                <UserPlus size={20} />
                {isOpen && <span className="ml-4">Register Client</span>}
              </a>
            </li>
            <li>
              <a href="/programs/enrollment" className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors">
                <ListPlus size={20} />
                {isOpen && <span className="ml-4">Program Enrollment</span>}
              </a>
            </li>

            <li>
              <a href="/programs/create" className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors">
                <PlusCircle size={20} />
                {isOpen && <span className="ml-4">Create Program</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* User profile at bottom */}
        <div className="p-4 border-t border-amber-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center text-white">
              D
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Dr. Smith</p>
                <p className="text-xs text-slate-400">General Medicine</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}