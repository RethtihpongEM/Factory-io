import {useAuthContext} from "../../context/AuthContext.jsx";
import React, {useContext, useState} from "react";
import {FactoryHome} from "./FactoryHome.jsx";
import {Community} from "./Account/Community.jsx";
import {RD} from "./Account/RD.jsx";
import {useProjectContext} from "../../context/Factory/ProjectContext.jsx";
import {ProjectCard} from "../../components/FactoryComponent/ProjectCard.jsx";
import UserContext from "../../context/UserContext.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {UserRD} from "./Account/UserRD.jsx";
import AdminPopUp from "../../components/Modals/AdminPopUp.jsx";
import {SaveView} from "./SaveView.jsx";

export const AccountView = () => {
  const {user, onLogout, token} = useAuthContext();
  const [tab, setTab] = useState('Community');
  const {projects} = useProjectContext();
  const navigate = useNavigate();
  const [openSave, setOpenSave] = useState(false);

  if (token) {
    return (
      <main className="flex flex-col items-center">
        <section className="w-full flex flex-col gap-6">
          <section className="shadow-xl">
            {/*cover picture*/}
            <section className="flex justify-center">
              <img className="aspect-[188/111] w-full max-h-[360px] object-cover" src="/assets/images/board.jpg"
                   alt=""/>
            </section>

            {/*user info section */}
            <section className="relative p-4 flex justify-between">
              {/*user pf*/}
              <div
                className="overflow-hidden absolute left-10 top-[-170px] shadow-blackFactory w-[200px] bg-whiteFactory h-[200px] rounded-[50%] shadow-md">
                <img src={`https://robohash.org/${user.username}`} alt=""/>
              </div>

              <div className="px-6 mt-6 flex flex-col gap-[0.1rem] tracking-wide">
                <span className="font-bold text-2xl">{user?.firstName + " " + user?.lastName}</span>
                <span className="text-sm text-grayFactory">{user?.bio}</span>
                {/*<span className="text-gray-500">Test address, address for testing{user?.address}</span>*/}
              </div>

              <div className="flex flex-col justify-between gap-1">
                <div className="text-[#3C3C3C] flex items-center">
                  <div className="flex flex-col items-center border-r-2 border-blackFactory pr-4">
                    <span>Follower</span>
                    <span className="text-blackFactory font-semibold">0</span>
                  </div>
                  {/*stick*/}
                  {/*<span*/}
                  {/*  className="w-[50px] h-0 border-[0.1rem] rounded-md  border-solid border-blackFactory transform rotate-90"></span>*/}
                  <div className="pl-4 flex flex-col items-center">
                    <span>Following</span>
                    <span className="text-blackFactory font-semibold">0</span>
                  </div>
                </div>

                <Link to={"/makerio/user"}
                  className="self-end flex gap-x-2 bg-grayFactory justify-center items-center px-10 py-2 rounded-lg">
                  <span>
                    Edit
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M12.475 4.71768L9.2875 1.56768L10.3375 0.517676C10.625 0.230176 10.9782 0.0864258 11.3973 0.0864258C11.8162 0.0864258 12.1692 0.230176 12.4562 0.517676L13.5062 1.56768C13.7937 1.85518 13.9437 2.20218 13.9562 2.60868C13.9687 3.01518 13.8312 3.36193 13.5437 3.64893L12.475 4.71768ZM11.3875 5.82393L3.4375 13.7739H0.25V10.5864L8.2 2.63643L11.3875 5.82393Z"
                      fill="#1D1D1F"/>
                  </svg>
                </Link>
              </div>
            </section>
          </section>

          <section className="flex">

            {/*community, rd switch*/}
            <section className="flex-1 flex flex-col gap-3">
              <div className="flex items-center">
                <button className={`${tab === 'Community' && 'text-redHover'} text-2xl`} onClick={() => {
                  setTab('Community')
                }}>Community
                </button>
                <span
                  className="w-[24px] h-0 border-[1px] rounded-md  border-solid border-redHover transform rotate-90"></span>
                <button className={`${tab === 'RD' && 'text-redHover'} text-2xl`} onClick={() => {
                  setTab('RD')
                }}>R&D
                </button>
              </div>

              <div className="w-full">
                {tab === 'Community' && 'Community User'}
                {tab === 'RD' && <UserRD/>}
              </div>
            </section>

            {/*setting float*/}
            <section className="self-start grid grid-rows-3 justify-center items-center border border-redBase">
              <div
                className="transition duration-200 cursor-pointer hover:bg-gray-200 px-10 py-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path
                    d="M14.6656 1.5625C14.831 1.56251 14.9922 1.61501 15.1258 1.71244C15.2595 1.80988 15.3588 1.94722 15.4094 2.10469L16.2688 4.775C16.6297 4.95156 16.975 5.15 17.3047 5.37344L20.0485 4.78281C20.2102 4.74827 20.3788 4.76597 20.5299 4.83337C20.6809 4.90076 20.8067 5.01436 20.8891 5.15781L23.0547 8.90625C23.1374 9.04962 23.1724 9.21555 23.1547 9.38011C23.137 9.54467 23.0675 9.69936 22.9563 9.82187L21.0735 11.9C21.1009 12.2985 21.1009 12.6984 21.0735 13.0969L22.9563 15.1781C23.0675 15.3006 23.137 15.4553 23.1547 15.6199C23.1724 15.7845 23.1374 15.9504 23.0547 16.0938L20.8891 19.8437C20.8065 19.9869 20.6806 20.1002 20.5296 20.1673C20.3785 20.2344 20.2101 20.2519 20.0485 20.2172L17.3047 19.6266C16.9766 19.8484 16.6297 20.0484 16.2703 20.225L15.4094 22.8953C15.3588 23.0528 15.2595 23.1901 15.1258 23.2876C14.9922 23.385 14.831 23.4375 14.6656 23.4375H10.3344C10.169 23.4375 10.0079 23.385 9.8742 23.2876C9.74054 23.1901 9.64125 23.0528 9.59064 22.8953L8.73283 20.2266C8.37286 20.0505 8.02566 19.8495 7.69377 19.625L4.95158 20.2172C4.78981 20.2517 4.62124 20.234 4.47017 20.1666C4.31911 20.0992 4.19333 19.9856 4.11095 19.8422L1.94533 16.0938C1.86263 15.9504 1.82761 15.7845 1.8453 15.6199C1.86299 15.4553 1.93249 15.3006 2.04377 15.1781L3.92658 13.0969C3.89931 12.6994 3.89931 12.3006 3.92658 11.9031L2.04377 9.82187C1.93249 9.69936 1.86299 9.54467 1.8453 9.38011C1.82761 9.21555 1.86263 9.04962 1.94533 8.90625L4.11095 5.15625C4.19355 5.01308 4.31943 4.8998 4.47048 4.8327C4.62153 4.7656 4.78997 4.74813 4.95158 4.78281L7.69377 5.375C8.02502 5.15156 8.37189 4.95 8.73283 4.77344L9.5922 2.10469C9.64265 1.94773 9.74146 1.81075 9.8745 1.71336C10.0075 1.61597 10.168 1.56317 10.3328 1.5625H14.6641H14.6656ZM14.0938 3.125H10.9063L10.0188 5.88594L9.42033 6.17812C9.12614 6.32209 8.84214 6.48601 8.57033 6.66875L8.0172 7.04375L5.1797 6.43125L3.58595 9.19375L5.53127 11.3469L5.48439 12.0094C5.46194 12.3361 5.46194 12.6639 5.48439 12.9906L5.53127 13.6531L3.58283 15.8063L5.17814 18.5687L8.01564 17.9578L8.56877 18.3313C8.84058 18.514 9.12458 18.6779 9.41877 18.8219L10.0172 19.1141L10.9063 21.875H14.0969L14.9875 19.1125L15.5844 18.8219C15.8783 18.6782 16.1618 18.5143 16.4328 18.3313L16.9844 17.9578L19.8235 18.5687L21.4172 15.8063L19.4703 13.6531L19.5172 12.9906C19.5397 12.6634 19.5397 12.335 19.5172 12.0078L19.4703 11.3453L21.4188 9.19375L19.8235 6.43125L16.9844 7.04063L16.4328 6.66875C16.1618 6.48565 15.8783 6.32171 15.5844 6.17812L14.9875 5.8875L14.0953 3.125H14.0938ZM12.5 7.8125C13.7432 7.8125 14.9355 8.30636 15.8146 9.18544C16.6937 10.0645 17.1875 11.2568 17.1875 12.5C17.1875 13.7432 16.6937 14.9355 15.8146 15.8146C14.9355 16.6936 13.7432 17.1875 12.5 17.1875C11.2568 17.1875 10.0645 16.6936 9.18545 15.8146C8.30638 14.9355 7.81252 13.7432 7.81252 12.5C7.81252 11.2568 8.30638 10.0645 9.18545 9.18544C10.0645 8.30636 11.2568 7.8125 12.5 7.8125ZM12.5 9.375C11.6712 9.375 10.8764 9.70424 10.2903 10.2903C9.70426 10.8763 9.37502 11.6712 9.37502 12.5C9.37502 13.3288 9.70426 14.1237 10.2903 14.7097C10.8764 15.2958 11.6712 15.625 12.5 15.625C13.3288 15.625 14.1237 15.2958 14.7097 14.7097C15.2958 14.1237 15.625 13.3288 15.625 12.5C15.625 11.6712 15.2958 10.8763 14.7097 10.2903C14.1237 9.70424 13.3288 9.375 12.5 9.375Z"
                    fill="#9747FF"/>
                </svg>
                Settings
              </div>
              <button onClick={(event) => {
                event.stopPropagation();
                setOpenSave(true)
              }}
                      className="transition duration-200 cursor-pointer hover:bg-gray-200 px-10 py-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill="none">
                  <path
                    d="M0.208252 18.875V2.20833C0.208252 1.63542 0.412418 1.14479 0.820752 0.73646C1.22909 0.328127 1.71936 0.124307 2.29159 0.125002H12.7083C13.2812 0.125002 13.7718 0.329168 14.1801 0.737502C14.5885 1.14584 14.7923 1.63611 14.7916 2.20833V18.875L7.49992 15.75L0.208252 18.875ZM2.29159 15.6979L7.49992 13.4583L12.7083 15.6979V2.20833H2.29159V15.6979Z"
                    fill="#8A0000"/>
                </svg>
                Saved
              </button>
              <AdminPopUp id={"saved-project-view"} content={<SaveView openSave={openSave} setOpenSave={setOpenSave}/>}
                          setModalOpen={setOpenSave} modalOpen={openSave}/>
              <button onClick={onLogout}
                      className="transition duration-200 cursor-pointer hover:bg-gray-200 px-10 py-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M12.623 13.275C12.4353 13.0583 12.3414 12.8123 12.3414 12.537C12.3414 12.2623 12.4353 12.0333 12.623 11.85L14.5178 10H7.16927C6.87909 10 6.63602 9.904 6.44006 9.712C6.24341 9.52067 6.14509 9.28333 6.14509 9C6.14509 8.71667 6.24341 8.479 6.44006 8.287C6.63602 8.09567 6.87909 8 7.16927 8H14.5178L12.623 6.15C12.4182 5.95 12.3158 5.71267 12.3158 5.438C12.3158 5.16267 12.4182 4.925 12.623 4.725C12.8108 4.525 13.0457 4.425 13.3277 4.425C13.609 4.425 13.8435 4.51667 14.0313 4.7L17.7183 8.3C17.8208 8.4 17.8935 8.50833 17.9365 8.625C17.9788 8.74167 18 8.86667 18 9C18 9.13333 17.9788 9.25833 17.9365 9.375C17.8935 9.49167 17.8208 9.6 17.7183 9.7L14.0313 13.3C13.8094 13.5167 13.5663 13.6123 13.3021 13.587C13.0372 13.5623 12.8108 13.4583 12.623 13.275V13.275ZM2.04836 18C1.48506 18 1.00267 17.8043 0.601195 17.413C0.200398 17.021 0 16.55 0 16V2C0 1.45 0.200398 0.979 0.601195 0.587C1.00267 0.195667 1.48506 0 2.04836 0H8.19346C8.48364 0 8.72706 0.0956666 8.9237 0.287C9.11966 0.479 9.21764 0.716667 9.21764 1C9.21764 1.28333 9.11966 1.52067 8.9237 1.712C8.72706 1.904 8.48364 2 8.19346 2H2.04836V16H8.19346C8.48364 16 8.72706 16.096 8.9237 16.288C9.11966 16.4793 9.21764 16.7167 9.21764 17C9.21764 17.2833 9.11966 17.5207 8.9237 17.712C8.72706 17.904 8.48364 18 8.19346 18H2.04836Z"
                    fill="#D93F33"/>
                </svg>
                Log out
              </button>
            </section>

          </section>

        </section>
      </main>
    );
  } else {
    navigate('/');
  }
};

