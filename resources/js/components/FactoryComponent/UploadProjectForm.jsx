import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";
import {ProposalTab} from "./Tabs/ProposalTab.jsx";
import {ProjectTab} from "./Tabs/ProjectTab.jsx";
import AdminPopUp from "../Modals/AdminPopUp.jsx";
import {Carousel} from "flowbite-react"
//
// import {FilePond, registerPlugin} from 'react-filepond'
// // import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import 'filepond/dist/filepond.min.css'
// // import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
//
// registerPlugin(FilePondPluginFileValidateType)
// const filePondUrl = import.meta.env.VITE_APP_URL;
export const UploadProjectForm = ({setModalOpen, modalOpen}) => {
  const {
    postProject,
    setErrors,
    errors,
    picture,
    setPicture,
    handlePicture,
    handleFile,
    setProjectValues,
    projectValues,
    projectsIsLoading,
    setIsPosting,
    isPosting,
  } = useProjectContext();

  const {user} = useAuthContext();
  const [formTab, setFormTab] = useState('project');
  const [file, setFile] = useState([]);

  useEffect(() => {
    setErrors({});
    setFile(null)
  }, [modalOpen]);

  return (
    <>
      <section className="min-w-[1920px]:px-96 xl:px-56 md:px-12
        w-screen h-screen overflow-auto py-4 text-blackFactory rounded-md bg-whiteFactory">
        <section className="flex items-center justify-between border-b-2 border-grayFactory">
          <div>Upload Project</div>
          <button onClick={(e) => {
            e.stopPropagation();
            setModalOpen(false);
          }} className="transition duration-200 border rounded-[50%] hover:bg-blackFactory/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor"
                 className="transition duration-200 w-6 h-6 hover:text-whiteFactory hover:bg-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </section>
        <section className="px-4 pt-4 gap-12 flex items-center lg:flex-row flex-col">
          <section className="flex gap-2 flex-col justify-center lg:w-[440px] md:w-full md:min-h-[400px]">
            <label
              className={`${picture?.filter(pic => pic?.type.slice(0,5) === 'image').length > 0 && 'hidden'} flex-1 transition duration-200 flex items-center justify-center bg-gray-300 border rounded-md hover:bg-gray-500 cursor-pointer`}
              htmlFor="projectImage">
              <div className={`${picture?.filter(pic => pic?.type.slice(0,5) === 'image').length > 0 && 'hidden'} flex items-center gap-2`}>
                {/*image icon*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                </svg>
                Add Photos
              </div>
              <input multiple type="file" id="projectImage" className="hidden" accept="image/*" onChange={(event) => {
                handlePicture(event)
              }}/>
            </label>
            <span
              className={`${!errors?.image && 'hidden'} self-end text-redBase text-xs`}>{errors?.image?.map(error => error)}</span>
            {picture?.filter(pic => pic?.type.slice(0,5) === 'image').length > 0 && (
              <>
                <Carousel indicators={false}>
                  {picture?.filter(pic => pic?.type.slice(0,5) === 'image').map((pic, key) => {
                    return (
                      <div key={key}
                           className="relative flex-col flex justify-center bg-grayFactory shadow-blueActive shadow-sm">
                        <img loading="lazy" className="mt-auto object-contain max-h-[350px]"
                             src={URL.createObjectURL(pic)}
                             alt=""/>
                        <button
                          className={`self-center py-2 mt-auto bg-blackFactory text-whiteFactory transition w-full duration-200 hover:bg-blackFactory/50`}
                          onClick={() => {
                            const fileListArr = [...picture]; // convert filelist to arr
                            fileListArr.splice(key, 1)
                            setPicture(fileListArr)
                          }}>
                          Remove
                        </button>
                      </div>
                    )
                    // if(pic?.type.slice(0,5) === 'image') {
                    //
                    // }
                  })}
                </Carousel>
                <label
                  className="transition duration-200 self-center rounded-md bg-blueBase text-sm text-whiteFactory py-2 w-fit px-12 hover:shadow-lg hover:shadow-grayFactory"
                  htmlFor="addMore">
                  Add More
                  <input accept={"image/*"} id={"addMore"} multiple className="hidden" type="file"
                         onChange={event => {
                           const fileList = [...event.target.files];
                           setPicture([...picture, ...fileList])
                         }}/>
                </label>
              </>
            )}
          </section>
          <section className="flex-1 flex flex-col gap-3 justify-start">

            <div className="flex gap-3">
              <div className="flex flex-col items-start w-full">
                <label htmlFor="projectName">Project's Name</label>
                <input value={projectValues.name}
                       onChange={event => setProjectValues({...projectValues, name: event.target.value})}
                       className="rounded-md w-full" name="projectName" type="text"/>
                <span
                  className={`${!errors?.name && 'hidden'} text-redBase text-xs`}>{errors?.name?.map(error => error)}</span>
              </div>
              <div className="flex flex-col items-start w-full">
                <label htmlFor="projectCate">
                  Category
                </label>
                <input value={projectValues.category}
                       onChange={event => setProjectValues({...projectValues, category: event.target.value})}
                       className="rounded-md w-full" name="projectCate" type="text"/>
                <span
                  className={`${!errors?.category && 'hidden'} text-redBase text-xs`}>{errors?.category?.map(error => error)}</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="description">Description</label>
              <textarea value={projectValues.description}
                        placeholder={"Project's description..."}
                        onChange={event => setProjectValues({...projectValues, description: event.target.value})}
                        id="description" className="w-full rounded-md" rows="5"></textarea>
              <span
                className={`${!errors?.description && 'hidden'} text-redBase text-xs`}>{errors?.description?.map(error => error)}</span>
            </div>

            <div className="flex justify-between">

              <div className="flex flex-col items-start">
                <label htmlFor="target_fund">Target Amount</label>
                <input value={projectValues.target_fund} id="target_fund" onChange={event => setProjectValues({
                  ...projectValues,
                  target_fund: Number(event.target.value) && Number(event.target.value)
                })} className="rounded-md" min="0" type="number"/>
                <span
                  className={`${!errors?.target_fund && 'hidden'} text-redBase text-xs`}>{errors?.target_fund?.map(error => error)}</span>
              </div>

              <div className="flex flex-col items-end">
                <label className="self-start" htmlFor="projectDeadline">Deadline</label>
                <input value={projectValues.project_deadline}
                       onChange={event => setProjectValues({...projectValues, project_deadline: event.target.value})}
                       className={`${errors?.project_deadline && 'w-full'} rounded-md`} type="date"
                       name="projectDeadline"/>
                <span
                  className={`${!errors?.project_deadline && 'hidden'} self-start text-redBase text-xs`}>{errors?.project_deadline?.map(error => error)}</span>
              </div>

            </div>
          </section>
        </section>

        <section className="px-4 flex">
          <div className='pt-4 flex flex-col border-r-2 border-blackFactory h-[150px]'>
            <button
              className={`${formTab === 'project' && 'bg-[#D9D9D9]'} whitespace-nowrap rounded-md transition duration-200 px-4 py-2 hover:bg-[#D9D9D9]`}
              onClick={() => setFormTab('project')}>Project
            </button>
            <button
              className={`${formTab === 'proposal' && 'bg-[#D9D9D9]'} whitespace-nowrap rounded-md transition duration-200 px-4 py-2 hover:bg-[#D9D9D9]`}
              onClick={() => setFormTab('proposal')}>
              Factory Hub
            </button>
            <span
              className={`${!errors?.proposal && 'hidden'} text-redBase text-xs`}>{errors?.proposal?.map(error => error)}</span>
          </div>
          <div className={'w-full flex flex-col gap-4 px-4'}>
            <div className="self-end w-full">
              {/*<FilePond*/}
              {/*  styleButtonRemoveItemAlign={false}*/}
              {/*  files={file}*/}
              {/*  acceptedFileTypes={['application/x-zip-compressed',*/}
              {/*    'application/pdf',*/}
              {/*    'application/x-7z-compressed',*/}
              {/*    'application/x-gzip',*/}
              {/*    'application/x-tar',*/}
              {/*  ]}*/}
              {/*  server={{*/}
              {/*    process: `${filePondUrl}/api/v1/tmp-post`,*/}
              {/*    revert: `${filePondUrl}/api/v1/tmp-delete`,*/}
              {/*  }}*/}
              {/*  onupdatefiles={(e) => {*/}
              {/*    setFile(e)*/}
              {/*    handleFile(e)*/}
              {/*  }}*/}
              {/*  allowDrop={true}*/}
              {/*  allowMultiple={true} maxFiles={1}/>*/}

              <div
                className={`${!errors?.file && 'hidden'} mt-2 text-redBase text-xs`}>{errors?.file?.map(error => error)}</div>
            </div>
            <div className="self-start w-full h-full">
              {formTab === 'proposal' && <ProposalTab/>}
              {formTab === 'project' && <ProjectTab/>}
            </div>

            <button
              disabled={isPosting}
              onClick={() => {
                postProject(setModalOpen, user)
              }}
              className="self-end transition duration-150 bg-blueBase text-whiteFactory px-6 py-2 rounded-[20px] font-semibold hover:bg-blueHover">
              Post
              {isPosting && <span>...</span>}
            </button>
          </div>
        </section>
        {/*<input type="file" onChange={e => handleFile(e)}/>*/
        }
      </section>
    </>
  )
}
