interface SocialButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  color?: string;
}

const SocialButton = ({ Icon, text, color = "" }: SocialButtonProps) => (
  <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
    {Icon && <Icon className={`w-6 h-6 ${color}`} />}
    {text && <span>{text}</span>}
  </button>
);

export default SocialButton;
