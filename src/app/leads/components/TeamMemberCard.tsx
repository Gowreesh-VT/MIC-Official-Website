import React from 'react';

type TeamMemberCardProps = {
  role: string;
  name: string;
  color: string; // Tailwind CSS color class, e.g., 'bg-pink-200'
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ role, name, color }) => {
  return (
    <div className={`relative ${color} p-4 rounded-lg shadow-lg text-center w-48 h-48 flex flex-col justify-between items-center border-4 border-gray-700`}>
      <div className="absolute -top-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold uppercase font-press-start">
        {role}
      </div>
      <div className="mt-8 text-xl font-bold font-press-start">
        {name}
      </div>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-3xl">⭐</span>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberCard; 