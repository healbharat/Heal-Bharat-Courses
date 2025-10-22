import React from 'react';
import { View } from '../types';
import { CodeIcon } from './icons/CodeIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { LaptopCodeIcon } from './icons/LaptopCodeIcon';
import { MicIcon } from './icons/MicIcon';
import { BrainIcon } from './icons/BrainIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { BotIcon } from './icons/BotIcon';
import { PythonIcon } from './icons/PythonIcon';
import { CertificateIcon } from './icons/CertificateIcon';

interface NavItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick, isDisabled = false }) => (
  <li>
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 text-sm ${
        isActive
          ? 'bg-slate-700 text-white font-semibold'
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
      } ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : ''
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>{label}</span>
    </button>
  </li>
);

interface MainSidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isPythonCourseCompleted: boolean;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ activeView, setActiveView, isPythonCourseCompleted }) => {
  const navItems = [
    { view: View.DASHBOARD_HOME, label: 'Dashboard', icon: DashboardIcon },
    { view: View.COURSE_SELECTION, label: 'Courses', icon: BookOpenIcon },
    { view: View.CODING_PRACTICE, label: 'Coding Practice', icon: LaptopCodeIcon },
    { view: View.INTERVIEW_PRACTICE, label: 'Interview Practice', icon: MicIcon },
    { view: View.APTITUDE_PRACTICE, label: 'Aptitude Practice', icon: BrainIcon },
    { view: View.INTERNSHIP, label: 'Internship', icon: BriefcaseIcon },
  ];

  const healBharatItems = [
    { view: View.PYTHON_COURSE, label: 'Python with AI/DS', icon: PythonIcon },
    { view: View.CERTIFICATE, label: 'Certificate', icon: CertificateIcon, disabled: !isPythonCourseCompleted },
  ];

  const specialItems = [
    { view: View.AI_CHATBOT, label: 'Tronex AI', icon: BotIcon },
  ];

  return (
    <aside className="w-64 bg-slate-800 p-4 flex-shrink-0 flex flex-col border-r border-slate-700 hidden md:flex">
      <div className="flex items-center gap-3 mb-8 px-2">
        <CodeIcon className="w-8 h-8 text-teal-400" />
        <h1 className="text-xl font-bold text-white">Heal Bharat</h1>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.view}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.view}
              onClick={() => setActiveView(item.view)}
            />
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-700">
            <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Heal Bharat Courses</h3>
            <ul className="space-y-2">
                {healBharatItems.map((item) => (
                    <NavItem
                    key={item.view}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    isDisabled={item.disabled}
                    />
                ))}
            </ul>
        </div>
        
        <hr className="my-4 border-slate-700" />
        <ul className="space-y-2">
           {specialItems.map((item) => (
            <NavItem
              key={item.view}
              icon={item.icon}
              label={item.label}
              isActive={activeView === item.view}
              onClick={() => setActiveView(item.view)}
            />
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto flex-shrink-0 p-4 bg-slate-900/50 rounded-lg text-center border border-slate-700">
        <h3 className="font-bold text-white">Ready for your Internship?</h3>
        <p className="text-xs text-slate-400 mt-2">Complete all your courses to unlock your real-time project.</p>
        <button onClick={() => setActiveView(View.INTERNSHIP)} className="mt-4 w-full bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700 transition">
            View Status
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;