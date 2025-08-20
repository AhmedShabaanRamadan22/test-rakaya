import React from "react";

const Map = () => {
  return (
    <>
      <div className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.166098002887!2d39.71545512209677!3d21.403383801589637!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21943386d0bf1%3A0x91ff8d57deb53f8a!2z2YXYsdmD2LIg2KfZhNi02K7YtdmK2KfYqiDYp9mE2YXZh9mF2KkgViBJIFA!5e0!3m2!1sar!2seg!4v1709707942785!5m2!1sar!2seg"
          // width="400"
          className="w-100 rounded"
          height="300"
          // style="border:0;"
          // allowfullscreen=""
          title="location rakaya"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {/* End google-map */}
    </>
  );
};

export default Map;
