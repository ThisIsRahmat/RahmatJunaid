"use client";

import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { combineCollections, RichText } from 'readcv';
import { Masonry } from 'masonic';
import '@fontsource-variable/inter';
import { motion, useScroll, useTransform, AnimatePresence  } from 'framer-motion';


import cv from './cv';

function App() {
  const [activeView, setActiveView] = useState("projects");

  return (
    
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
         {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Header />
      </motion.div>
         {/* Toggle */}
      {/* <motion.div
        className="toggle-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="toggle-pill">
          <motion.div
            className="pill"
            layout
            animate={{
              x: activeView === "projects" ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 60 }}
          />
          <motion.button
            onClick={() => setActiveView("projects")}
            style={{
              fontWeight: activeView === "projects" ? 500 : 400,
            }}
          
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Projects
          </motion.button>
          <motion.button
            onClick={() => setActiveView("information")}
            style={{
              fontWeight: activeView === "information" ? 500 : 400,
            }}
            
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Information
          </motion.button>
        </div>
      </motion.div> */}

<h2>Projects</h2>
<Projects />
<Information />


      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="content"
      >
        {activeView === "projects" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
           
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
          
          </motion.div>
        )}
      </motion.div>
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
}


function Footer(props) {
  const containerRef = useRef(null);
  const status = cv.general.status;
  const links = cv.contact;

  return (
    <motion.div
      ref={containerRef}
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >

<h2>Contact</h2>
  
            {/* Links */}
            {links.length > 0 && (
        <div className="links">
               
          {links.map((contactItem) => (
            <div key={contactItem.url}>
              <a href={contactItem.url} target="_blank" rel="noopener noreferrer">
                {contactItem.platform}
              </a>
              <span className="link-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#a1a1aa" viewBox="0 0 256 256">
                  <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                </svg>
              </span>
            </div>
          ))}
        </div>
      )}

    </motion.div>
  );
}


function Header(props) {
  const containerRef = useRef(null);
  const links = cv.contact;
  const about = cv.general.about;

  return (
    <motion.div
      ref={containerRef}
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div className="identity">
        {/* Profile Image */}
        <div className="profile-img">
          <img src={cv.general.profilePhoto} alt="Profile" />
        </div>

        {/* Display Name and Byline */}
        <div className="name-container">
          <h1>{cv.general.displayName}</h1>
          {cv.general.byline ? <h2>{cv.general.byline}</h2> : null}
        </div>

        {/* About */}
        {about ? <RichText text={about} /> : null}
      </div>


     
    </motion.div>
  );
}

function Information() {
  const links = cv.contact;
  const experiences = cv.workExperience;

  return (
    <div className="information">


      {/* Work Experiences */}
      {experiences.length > 0 && (
        <div className="work-experience">
          <h2>Work Experience</h2>
          <ul>
            {experiences.map((experience) => (
              <li key={experience.id}>
                <div className="experience-item">
                  <h3 className="experience-title">{experience.title}</h3>
                  <p className="experience-company">{experience.company}</p>
                  <p className="experience-year">{experience.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}




const Projects = ({ projectsData }) => {
  const projects = combineCollections(
    cv.projects,
    cv.sideProjects
  ).filter((x) => x.attachments.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="projects"
    >
      {projects.map((project, index) => (
        <Project key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
};


const Project = ({ project, index }) => {
  const [showAllAttachments, setShowAllAttachments] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const attachmentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="project"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="attachments">
        <AnimatePresence initial={false}>
          {project.attachments
            .slice(0, showAllAttachments ? project.attachments.length : 1)
            .map((attachment, i) => (
              <motion.div
                key={attachment.id || i}
                className="attachment"
                variants={attachmentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Attachment attachment={attachment} url={project.url} />
              </motion.div>
            ))}
        </AnimatePresence>
        {project.attachments.length > 1 && (
          <div
            className="load-more-media"
            onClick={() => setShowAllAttachments(!showAllAttachments)}
           whileTap={{ scale: 0.95 }}
            onHover={{ scale: 1.1 }}
          >
            {showAllAttachments ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#a1a1aa"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#a1a1aa"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            )}
          </div>
        )}
      </div>
      <ProjectInfo project={project} />
    </motion.div>
  );
};

const Attachment = ({ attachment, url }) => {
  const { type, width, height } = attachment;

  return (
    <div
      className="media"
      style={{ aspectRatio: width / height }}
      data-type={type}
    >
      {type === "image" ? (
        <img loading="lazy" src={attachment.url} alt="Project attachment" />
      ) : type === "video" ? (
        <video loading="lazy" src={attachment.url} autoPlay muted loop />
      ) : (
        <div>Unsupported attachment type</div>
      )}
    </div>
  );
};

const ProjectInfo = ({ project }) => (
  <div className="projectInfo">
    <div className="project-header">
      {project.url ? (
        <h2 className="project-title">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.heading}
          </a>
          <span className="link-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#a1a1aa"
              viewBox="0 0 256 256"
            >
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
            </svg>
          </span>
        </h2>
      ) : (
        <h2 className="project-title">{project.heading}</h2>
      )}
      <span className="project-year">{project.year}</span>
    </div>
   {project.description && (
  <div className="project-description">
    <RichText text={project.description} />
  </div>
)}

{project.collaborators.length > 0 && (
  <div className="project-collaboration">
    In collaboration with&nbsp;
    {project.collaborators.map((collaborator, i) => (
      <span key={i}>
        <a
          href={collaborator.profileURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {collaborator.displayName}
        </a>
        {i < project.collaborators.length - 1 ? ", " : "."}
      </span>
    ))}
  </div>
)}

  </div>
);


export default App;