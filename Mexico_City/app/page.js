"use client";

import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { combineCollections, RichText } from 'readcv';
import { Masonry } from 'masonic';
import useResizeObserver from 'use-resize-observer';
import '@fontsource-variable/inter';
import { motion, AnimatePresence } from 'framer-motion';

import cv from './cv';

function App() {


  // let projects;
  // if (!showInfo) {
  //   projects = <Projects key="projects"/>
  // }
  // let information;
  // if (showInfo) {
  //   information = <Information key="information"/>
  // }
  return (
    <div className="container">
      <div className="navigation">
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


      </div>
        {/* <button
         
          className="infoToggle">
         Time
        </button> */}
      </div>
<Information/>
<Projects/>
    </div>
  );
}


function Header(props) {
  const [top, setTop] = useState();
  const containerRef = useRef(null);
  const links = cv.contact;
  const about = cv.general.about;

  useEffect(() => {
    measure();
  }, []);
  
  const measure = () => {
    if (!containerRef.current) { return }

    let headerHeight = containerRef.current.offsetHeight;
    let windowHeight = window.innerHeight;

    if (headerHeight > windowHeight) {
      setTop(windowHeight - headerHeight);
    } else {
      setTop(undefined);
    }
  }
  
  const onResize = () => {
    measure();
  }
  
  useResizeObserver({ ref: containerRef, onResize });
  
  return (
    <div
      ref={containerRef}
      style={{
        top: top,
      }}
      className="header">
      <div className="identity">
        <h1>{cv.general.displayName}</h1>
        <p>{cv.general.byline}</p>
        {about ? <RichText text={about}/> : null}
      </div>
      {cv.contact.length > 0 ?
      <div className="links">
        {cv.contact.map((contactItem, index) => {
          return (
            <div key={contactItem.url}><a href={contactItem.url} target="_blank">{contactItem.platform}</a></div>
          )
        })}
        <div><a href={"https://read.cv/" + cv.general.username} target="_blank">Read.cv</a></div>
      </div>
      : null}
    </div>
  );
}


function Information(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      class="information">
      {cv.general.about ?
        <RichText text={cv.general.about}/>
      :
        cv.general.byline ?
        <RichText text={cv.general.byline}/>
        : null
      }
      {cv.contact.length > 0 ?
      <p>
        {cv.contact.map((contactItem, index) => {
          let comma;
          if (index !== cv.contact.length - 1) {
            comma = ", "
          }
          return (
            <>
              <a key={contactItem.url} href={contactItem.url} target="_blank">{contactItem.platform}</a>{comma}
            </>
          )
        })}
      </p>
      : null}
    </motion.div>
  );
}


function Projects(props) {
  const projects = combineCollections(cv.projects, cv.sideProjects).filter(x => x.attachments.length > 0);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      class="projects">
      {projects.map((project, index) => {
        return (
          <Project
            key={index}
            lastChild={index === projects.length - 1}
            project={project}/>
        )
      })}
    </motion.div>
  );
}

function Project(props) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    setMedia(adaptAttachments());
  }, []);

  const adaptAttachments = () => {
    return props.project.attachments.map((object, index) => ({
      ...object,
      link: props.project.url,
    }))
  }
  
  return (
    <>
      <div className="project">
        <div className="projectInfo">
          {props.project.url ?
            <h2><a href={props.project.url} target="_blank">{props.project.heading}</a></h2>
          :
            <h2>{props.project.heading}</h2>
          }
          <p>{props.project.year}</p>
          {props.project.description ?
            <RichText text={props.project.description}/>
          : null}
          {props.project.collaborators.length > 0 ?
            <p>
              In collaboration with&nbsp;
              {props.project.collaborators.map((collaborator, index) => {
                let punctuation;
                if (index < props.project.collaborators.length - 1) {
                  punctuation = <>, </>
                } else {
                  punctuation = <>.</>
                }
              
                return (
                  <>
                    <a href={collaborator.profileURL} target="_blank">{collaborator.displayName}</a>{punctuation}
                  </>
                )
              })}
            </p>
          : null}
        </div>
        <div className="attachments">
          <Masonry
            overscanBy={Infinity}
            maxColumnCount={2}
            columnWidth={360}
            columnGutter={24}
            rowGutter={24}
            items={media}
            itemKey={data => data.url}
            render={Item} />
        </div>
      </div>
      {props.lastChild === false ? <hr/> : null}
    </>
  )
}

const Item = ({
  index,
  data: { 
    link,
    url,
    width,
    height,
    type,
  },
  columnWidth
}) => {
  let itemLink = link;
  let attachment = type === "image" ?
    <img loading="lazy" src={url}/> :
    <video loading="lazy" src={url} autoPlay muted playsInline loop/>
          
  if (itemLink) {
    return (
      <a
        key={url}
        href={link}
        target="_blank"
        className="media"
        style={{
          aspectRatio: width / height,
          border: "none",
        }}
        >
        {attachment}
      </a>
    )
  }
  
  return (
    <div
      key={url}
      className="media"
      style={{
        aspectRatio: width / height,
      }}
      >
      {attachment}
    </div>
  )
}


export default App;