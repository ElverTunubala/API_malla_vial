import Link from 'next/link';
import '../../styles/globals.css';

export default function VideoBackground() {
  return (
    <div className="video-background">
      <video autoPlay muted loop className="video-background__video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-background__overlay">
        <div className="video-background__content">
          <h1>Welcome to My Website</h1>
          <Link href="/form">
            <button type="button" className="btn btn-info">
              Mas Información
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
