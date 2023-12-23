import { useRouter } from 'next/router';

const watch = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <iframe 
      className="absolute top-0 left-0 w-full h-screen" // Tailwind CSS classes
      src={`https://www.2embed.cc/embed/${id}`} 
      frameBorder="0" 
      scrolling="no" 
      allowFullScreen
    />
  );
};

export default watch;