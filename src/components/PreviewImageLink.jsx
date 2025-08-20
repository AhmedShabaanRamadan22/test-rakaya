/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import ViewICon from "./icons/ViewICon";

export default function PreviewImageLink({ url }) {
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
          <div className="bg-secondary px-5 py-2 rounded-3">
            <ViewICon className="" />
          </div>
        </a>
      </Fancybox>
    </div>
  );
}
