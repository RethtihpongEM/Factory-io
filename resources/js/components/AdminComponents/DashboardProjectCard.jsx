import React, {useState} from "react"
import {Carousel, Spinner} from "flowbite-react";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";
import {ImageExpand} from "../../components/ImageExpand.jsx";
import {ProjectComment} from "../../components/FactoryComponent/ProjectComment.jsx";
import {ProjectStar} from "../../components/FactoryComponent/ProjectStar.jsx";
import {ProjectSave} from "../../components/FactoryComponent/ProjectSave.jsx";
import {PiWarningLight} from "react-icons/pi"
import {Link} from "react-router-dom";

const imgUrl = import.meta.env.VITE_APP_URL;
export const DashboardProjectCard = ({project}) => {
  const {projectImages} = project;
  const [modalOpen, setModalOpen] = useState(false);
  const [expandImg, setExpandImg] = useState(false);
  const [curExp, setCurExp] = useState('');

  return (
    <div className={"grid grid-cols-[1fr_2fr_1fr] gap-4"}>
      <section className={""}>
        <Carousel>
          {projectImages?.map(proj => {
            return (
              <div className={"flex justify-center relative"} key={proj?.id}>
                <button onClick={(e) => {
                  e.stopPropagation()
                  setExpandImg(true)
                  setCurExp(proj?.image)
                }}>
                  <img className={"w-96 aspect-video object-contain"} src={`${imgUrl}/projects/${proj?.image}`} alt=""/>
                </button>
                <ImageExpand imgSrc={`${imgUrl}/projects/${curExp}`} setOpen={setExpandImg} open={expandImg}/>
              </div>
            )
          })}
        </Carousel>
      </section>
      <section className={"flex flex-col gap-2 p-4"}>
        <div className={"border-b-2 border-grayFactory pb-4"}>
          <p className={"font-semibold"}>{project?.name}</p>
          <p className={"text-sm"}>{project?.description}</p>
        </div>
        <div className={"border-b-2 border-grayFactory pb-4"}>
          <p>Target Fund: <span className={"text-redHover font-semibold"}>${project?.target_fund}</span></p>
          <p>Project's Deadline: {project?.project_deadline.slice(0, 10)}</p>
        </div>
        <div className={"flex justify-evenly gap-4 mt-auto"}>
          <div className={"flex gap-2 items-center justify-center"}>
            <ProjectStar project={project}/>
            <span className={"font-semibold text-sm"}>{project?.like_count}</span>
          </div>
          <div className={"flex gap-2 items-center justify-center"}>
            <ProjectComment project={project}/>
            <span className={"font-semibold text-sm"}>{project?.comment_count}</span>
          </div>
          <div className={"flex gap-2 items-center justify-center"}>
            <ProjectSave project={project}/>
            <span className={"font-semibold text-sm"}>{project?.save_count}</span>
          </div>
        </div>
      </section>
      <section className={"flex"}>
        <button className={"w-fit p-4 bg-redBase text-whiteFactory"} onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true)
        }}>Delete
        </button>
        <Link to={`/project/${project?.id}`}
              className={"p-4 flex w-fit justify-center items-center bg-blueBase text-whiteFactory"} onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true)
        }}>
          View Info
        </Link>
      </section>
      <AdminPopUp content={<DeleteModal project={project} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
                  modalOpen={modalOpen} setModalOpen={setModalOpen} id={"delete-project-modal"}/>
    </div>
  );
};

const DeleteModal = ({setModalOpen, project}) => {
  const {deleteProject, isPosting} = useProjectContext();
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <div className={"p-4 bg-whiteFactory flex flex-col w-[20%] rounded-md"}>
          <section className={"flex justify-center items-center"}>
            <PiWarningLight className={"text-redBase w-8 h-8"}/> <span> Are you sure to delete this project?</span>
          </section>
          <section className={"mt-auto flex justify-center gap-4"}>
            <button disabled={isPosting || false} onClick={(e) => {
              e.stopPropagation();
              deleteProject(project);
            }}
                    className={`${isPosting ? 'bg-opacity-60' : 'bg-redBase hover:bg-redHover'} transition duration-200 px-4 py-1 text-whiteFactory rounded-md`}>
              Confirm {isPosting && <Spinner color={"purple"} size={"md"}/>}
            </button>
            <button disabled={isPosting || false} onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
                    className={`${isPosting ? 'bg-opacity-60' : 'bg-blueActive hover:bg-blueHover'} transition duration-200 px-4 py-1 text-whiteFactory rounded-md`}>
              Cancel
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
