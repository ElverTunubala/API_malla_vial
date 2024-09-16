import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import VideoBackground from './components/VideoBackground';

export default function Home() {
  return (
    <>
      <VideoBackground />
      <div className="content">
        <h1>Welcome to the Home Page</h1>
      </div>
    </>
  );
}
