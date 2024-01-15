import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import image from '../../assets/8261.jpg';
import ParticlesContainer from '../Particles/ParticlesConatiner';

const Home = () => {
  return (
    <div>
      
      <header className="masthead">
      <ParticlesContainer/>
        <div className="container px-5 z-index-99">
          <div className="row gx-5 align-items-center">
            <div className="firstpart col-lg-6">
            
              <div className="mb-5 pt-5 mt-4 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3">Navigate Efficiently, Avoid Traffic Hassles.</h1>
                <p className="lead fw-normal text-muted mb-5">
                  
                  Simplify your commute and reach your destination faster with our app. Say goodbye to traffic headaches!
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img className="img-fluid rounded-circle" src={image} alt="..." />
            </div>
          </div>
        </div>
      </header>

      <aside className="text-center bg-gradient-primary-to-secondary">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xl-8">
              <div className="h2 fs-1 text-white mb-4">
                "Experience a seamless journey with real-time traffic updates, ensuring you never get stuck again!"
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section className="bg-light">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-5">
              <h2 className="display-4 lh-1 mb-4">Effortless Navigation, No More Traffic Stress</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                Our app provides you with a smart and efficient route, avoiding traffic bottlenecks and ensuring a smooth journey.
                Never worry about delays again!
              </p>
            </div>
            <div className="col-sm-8 col-md-6">
              <div className="px-5 px-sm-0">
                <img className="img-fluid rounded-circle" src="https://source.unsplash.com/u8Jn2rzYIps/900x900" alt="..." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-center py-5">
        <div className="container px-5">
          <div className="text-white-50 small">
            <div className="mb-2">&copy; Your App 2023. All Rights Reserved.</div>
            <a href="#!">Privacy</a>
            <span className="mx-1">&middot;</span>
            <a href="#!">Terms</a>
            <span className="mx-1">&middot;</span>
            <a href="#!">FAQ</a>
          </div>
        </div>
      </footer>

      {/* Feedback Modal Section - If needed */}
      {/* Add your custom feedback modal content here */}
    </div>
  );
};

export default Home;
