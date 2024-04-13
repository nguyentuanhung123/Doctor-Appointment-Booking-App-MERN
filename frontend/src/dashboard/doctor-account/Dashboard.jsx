import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import  useGetProfile  from '../../hooks/useFetchData.jsx';
import { BASE_URL } from "../../config";
import Tabs from "./Tabs.jsx";
import starIcon from '../../assets/images/Star.png'
import { useState } from "react";
import DoctorAbout from "../../pages/Doctors/DoctorAbout.jsx";
import Profile from "./Profile.jsx";

const Dashboard = () => {

  const {data, loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  //console.log("Data: ", data);

  const [tab, setTab] = useState('overview');

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        { loading && !error && <Loading /> }
        { error && !loading && <Error /> }

        {
          !loading && !error && (
            <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
              <Tabs tab={tab} setTab={setTab}/>
              <div className="lg:col-span-2">
                {
                  data.isApproved === 'pending' && (
                    <div className="flex p-4 mb-4 text-yellow-800 rounded-lg">
                      <svg 
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path 
                          d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 
                          10.5 4.5C10.5 5.32843 11.1716 6 12 6ZM9 10H11V18H9V20H15V18H13V8H9V10Z"
                        ></path>
                      </svg>

                      <span className="sr-only">Info</span>
                      <div className="ml-3 text-sm font-medium">
                        To get approved please complete your profile. We&apos;ll
                        review manually and approve within 3 days
                      </div>
                    </div>
                  )
                }

                <div className="mt-8">
                  {
                    tab === 'overview' && (
                      <div>
                        <div className="flex items-center gap-4 mb-10">
                          <figure className="w-[200px] h-[200px] max-w-[200px] max-h-[200px]">
                            <img src={data?.photo} alt="" className="w-full h-full"/>
                          </figure>

                          <div>
                            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6
                            rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                              {data.specialization}
                            </span>

                            <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                              {data.name}
                            </h3>

                            <div className="flex items-center gap-[6px]">
                              <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                                <img src={starIcon} alt=""/>
                                {data.averageRating}
                              </span>
                              <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                                ({data.totalRating})
                              </span>
                            </div>

                            <p className="text__para text-[15px] lg:max-w-[390px] leading-6">
                              {data?.bio}
                            </p>
                          </div>
                        </div>
                        <DoctorAbout 
                          name={data.name} 
                          about={data.about} 
                          qualifications={data.qualifications}
                          experiences={data.experiences}
                        />
                      </div>
                    )
                  }
                  {
                    tab === 'appointments' && (
                      <div>appoinments</div>
                    )
                  }
                  {
                    tab === 'settings' && (
                      <Profile doctorData={data}/>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default Dashboard