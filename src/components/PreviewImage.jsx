/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import ViewICon from "./icons/ViewICon";

export default function PreviewImage({ url, children }) {
  return (
    <div className="">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <a data-fancybox="gallery" href={url} className="">
          {children}
        </a>
      </Fancybox>
    </div>
  );
}
