import React from "react";
import "../../styles/otherpage/storypage.css";

const StoryPage = () => {
  return (
    <div className="story-container">

      {/* SECTION 1 */}
      <section className="story-section">
        <div className="story-text">
          <h3>THE BRAND</h3>
          <div className="divider"></div>
          <p>
            I'm a paragraph. Click here to add your own text and edit me. 
            It’s easy—click “Edit Text” or double-click to make changes.
          </p>
          <p>
            Feel free to drag and drop me anywhere you like. 
            I'm great for telling a story or introducing your brand.
          </p>
        </div>

        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Brand"
          />
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="story-section reverse">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
            alt="Designers"
          />
        </div>

        <div className="story-text">
          <h3>THE DESIGNERS</h3>
          <div className="divider"></div>
          <p>
            I'm a paragraph. Click here to add your own text and edit me. 
            It’s easy—click “Edit Text” to change me.
          </p>
          <p>
            This is a great place to describe your team or tell your story 
            in detail so users know more about you.
          </p>
        </div>
      </section>

    </div>
  );
};

export default StoryPage;
