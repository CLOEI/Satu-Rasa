import Head from 'next/head'
import { AiOutlineMail, AiOutlineInstagram } from "react-icons/ai"
import { RxStack } from "react-icons/rx"
import { motion } from 'framer-motion'

import ProjectCard from '@/components/ProjectCard'

import client from "../../cms"
import { useEffect, useState } from 'react'

export default function Home({ projects }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsVisible(true)
      } else{
        setIsVisible(false)
      }
    })
  }, [])
  
  return (
    <>
      <Head>
        <title>Cendy</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='max-w-sm mx-auto p-2'>
        {isVisible && (
          <div className='fixed inset-0 p-4 flex max-w-sm mx-auto justify-between h-max items-center z-20 bg-card  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0'>
            <motion.p className='font-bold text-2xl' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Cendy</motion.p>
            <motion.div layout="position" layoutId='button' className='space-x-2'>
              <motion.a href="#projects" className="icon-button hover:after:content-['Projects'] group" aria-label='Project list' role="button" tabIndex={0}>
                <RxStack size={24} className="group-hover:text-rose-500"/>
              </motion.a>
              <motion.a href="JavaScript:void(0)" className="icon-button hover:after:content-['Instagram'] group" aria-label='Instagram' role="button" tabIndex={0}>
                <AiOutlineInstagram size={24} className="group-hover:text-rose-500"/> 
              </motion.a>
              <motion.a href="JavaScript:void(0)" className="icon-button hover:after:content-['Email'] group" aria-label='Email' role="button" tabIndex={0}>
                <AiOutlineMail size={24} className="group-hover:text-rose-500"/>
              </motion.a>
          </motion.div>
        </div>
        )}
        <div>
          <div className='h-screen flex items-center justify-center flex-col space-y-6'>
            <div className='text-center'>
              <motion.h1 className='text-5xl font-bold'>Hi, I&apos;m Cendy.</motion.h1>
              <p className='text-paragraph'>Probably a full-stack developer.</p>
            </div>
            <motion.div layout='position' layoutId='button' className='space-x-2 items-center' variants={container} initial="hidden" animate="show">
              <motion.a href="#projects" className="icon-button hover:after:content-['Projects'] group" aria-label='Project list' role="button" tabIndex={0} variants={item}>
                <RxStack size={24} className="group-hover:text-rose-500"/>
              </motion.a>
              <motion.a href="JavaScript:void(0)" className="icon-button hover:after:content-['Instagram'] group" aria-label='Instagram' role="button" tabIndex={0} variants={item}>
                <AiOutlineInstagram size={24} className="group-hover:text-rose-500"/> 
              </motion.a>
              <motion.a href="JavaScript:void(0)" className="icon-button hover:after:content-['Email'] group" aria-label='Email' role="button" tabIndex={0} variants={item}>
                <AiOutlineMail size={24} className="group-hover:text-rose-500"/>
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div id="projects">
          <motion.ol className='relative border-l border-card' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            {projects.map((project, i) => {
              return (
                <ProjectCard project={project} key={i}/>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const projects = await client.getEntries({
    content_type: "projects"
  })

  return {
		props: {
			projects: projects.items,
		},
		revalidate: 10,
	};
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}