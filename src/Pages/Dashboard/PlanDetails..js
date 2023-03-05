import { format, setDate } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import plan1 from '../../assets/icons/plan (3).png'
import plan2 from '../../assets/icons/plan (2).png'
import plan3 from '../../assets/icons/plan (1).png'
import Loading from '../../Share/Loading';
import ActivePlan from '../../Modale/ActivePlan';
import { useContext } from 'react';
import { Context } from '../../App';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from "framer-motion"
import { BiMessageAltDetail } from 'react-icons/bi';
import SeeDetailsPlan from '../../Modale/SeeDetailsPlan';


const PlanDetails = () => {
    const [planTime, setPlanTime] = useState('3-Days');
    const [activePlan, setActivePlan] = useState(null);
    const [seeDetails, setSeeDetails] = useState(null);
    const [me] = useContext(Context)

    const isActive = (id) => {
        const active = me?.PlanInTime?.find(i => i?._id?.includes(id));
        return active?._id
    }

   const  planAlert = (i) => {
     toast.warn(`Already Active ${i?.planName}`)
   }

    const getFacts = async () => {
		const res = await fetch('https://efp-usa-server-site.vercel.app/api/v1/plan', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
		return res.json();
	};
	// Using the hook
	const {data, error, refetch, isLoading} = useQuery('allTask', getFacts);
    console.log(data)

    if(isLoading){
        return <Loading />
    }


    const isDate = (PlanDate) => {
        const date = new Date(PlanDate);
        const expireDate = date.setDate(date.getDate() + 15);
        const expire = expireDate - new Date(); 
        console.log(expireDate, "expire")
        const dateExpr = format(new Date(expireDate), 'PP');
        if(expire < 0){
            return expire
        }else{
            return dateExpr
        }
    }

    const isDateExpire = (PlanDate) => {
        const date = new Date(PlanDate);
        const expireDate = date.setDate(date.getDate() + 15);
        const expire = expireDate - new Date(); 
        if((expire < 0) && (me?.FreePlan === 'active') ){
            fetch(`https://efp-usa-server-site.vercel.app/api/v1/User/FreePlanInactive/${me?._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',  
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
                },
                body: JSON.stringify({FreePlan: "inactive"})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status === "success"){
                        refetch();             
                    }
                    console.log(data)
                })
            }
    }

    const isPlanDate = (id) => {
        const active = me?.PlanInTime?.find(i => i?._id?.includes(id));
        const duration = parseInt(active?.planDuration?.split("-")?.[0]);
        const date = new Date(active?.date);
        const expireDate = date.setDate(date.getDate() + duration);
        const dateExpr = format(new Date(expireDate), 'PP');
        return dateExpr;
    }

    const PlanDateExpire = (id) => {
        const active = me?.PlanInTime?.find(i => i?._id?.includes(id));
        const duration = parseInt(active?.planDuration?.split("-")?.[0]);
        const date = new Date(active?.date);
        const expireDate = date.setDate(date.getDate() + duration);
        const expire = expireDate - new Date()
        const PlanId = {_id: id}

        if(expire < 0){
        fetch(`https://efp-usa-server-site.vercel.app/api/v1/User/planDelete/${me?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(PlanId)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    refetch();             
                }
                console.log(data)
            })
        }
    }




    const FreePlan = data?.find(i => i?.category?.includes('Free Plan'));
    const lifeTimePlan = data?.find(i => i?.category?.includes('Life time Plan'));
    const planDays = data?.filter(i => i?.planDuration?.includes(planTime));

    return (
        <div className='w-full sm:p-0 p-2'>
            <div className='bg-white p-2 rounded-md shadow-md'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 pb-4 sm:gap-4'>
                    <div>
                        <h1 className='font-bold mb-2'>Free Plan</h1>
                        <div className="p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px] text-white bg-[#700ab0] border-[#cb8bf4]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl">
                            <div className='relative border-b pb-1'>
                                <div className='w-full flex items-start justify-start'>
                                    <div className='w-16'>
                                        <img src={plan1} className='w-[50px]' alt="task " />    
                                    </div>
                                    <div className=''>
                                        <h3 className='text-[16px] capitalize font-bold'>{FreePlan?.planName}</h3>
                                        <p className='text-[12px]'>{FreePlan?.description}</p>
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0'>
                                    <h2 className={`font-bold`}>{FreePlan?.price} ৳</h2>
                                </div>
                                <div className='text-right flex items-center justify-end'>
                                    {(me?.FreePlan === 'inactive') && <p className='text-[12px]'>Only 15 Days</p>}
                                    {(me?.FreePlan === 'active') && <p className='text-[12px]'>Expire Date: {isDate(me?.FreePlanDate)}</p>}
                                    {(me?.FreePlan === 'active') && isDateExpire(me?.FreePlanDate)}
                                </div>
                            </div>
                            <div className='flex items-end mt-3 justify-between'>
                                <div className=' flex items-center'>
                                    <h1 className='text-[12px] border-r pr-2 flex items-center gap-2'>Unit Price: <p>{FreePlan?.unitPrice}</p></h1>
                                    <h1 className='text-[12px] pl-2 flex items-center gap-2'>Daily Task: <p>{FreePlan?.dailyTask}</p></h1>
                                </div>
                                {(me?.FreePlan === 'inactive') && <label onClick={() => setActivePlan(FreePlan)} htmlFor='active-plan' className="btn w-[100px] btn-accent text-white btn-sm" disabled={(me?.LifeTimePlan === 'active') || (me?.PlanInTime?.length > 0)}>Start</label>}
                                {(me?.FreePlan === 'active') && <button onClick={() => planAlert(FreePlan)} className="btn w-[100px] btn-accent text-white btn-success btn-sm">Active</button>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className='font-bold mb-2'>Life Time plan</h1>
                        <div className="p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px] text-white bg-[#03841b] border-[#9ef5a5]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl">
                            <div className='relative border-b pb-1'>
                                <div className='w-full flex items-start justify-start'>
                                    <div className='w-16'>
                                        <img src={plan2} className='w-[50px]' alt="task " />    
                                    </div>
                                    <div className=''>
                                        <h3 className='text-[16px] capitalize font-bold'>{lifeTimePlan?.planName}</h3>
                                        <p className='text-[12px]'>{lifeTimePlan?.description}</p>
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0'>
                                    <h2 className={`font-bold`}>{lifeTimePlan?.price} ৳</h2>
                                </div>
                                <div className='text-right flex items-center justify-end'>
                                    <p className='text-[12px]'>Live Time Excess</p>
                                </div>
                            </div>
                            <div className='flex items-end mt-3 justify-between'>
                                <div className=' flex items-center'>
                                    <h1 className='text-[12px] border-r pr-2 flex items-center gap-2'>Unit Price: <p>3.5%, 4%, 4.5%, 5%</p></h1>
                                    <h1 className='text-[12px] pl-2 flex items-center gap-2'>Daily Task: <p>{lifeTimePlan?.dailyTask}</p></h1>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <label onClick={() => setSeeDetails("see")} htmlFor='see-details-plan' className='text-bold z-10 px-2 cursor-pointer text-white'><BiMessageAltDetail size={24} /></label>
                                    {(me?.LifeTimePlan === 'inactive') && <label onClick={() => setActivePlan(lifeTimePlan)} htmlFor='active-plan' className="btn w-[100px] btn-accent text-white btn-sm" disabled={me?.balance < lifeTimePlan?.price}>Start</label>}
                                    {(me?.LifeTimePlan === 'active') && <button onClick={() => planAlert(lifeTimePlan)} className="btn w-[100px] btn-accent text-white btn-success btn-sm">Active</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white p-2 pb-5 sm:pb-8 sm:p-3 mt-5 rounded-md shadow-md'>
                <h1 className='font-bold text-center mb-2'>Plan in Time</h1>
                <div className="w-full flex items-center justify-between ">
                    <div onClick={() => setPlanTime('3-Days')} className={`${(planTime === '3-Days')? '!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>3 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('7-Days')} className={`${(planTime === '7-Days')? '!bg-[#dbfbd7] border-[3px] border-[#abf98d] rounded-md !text-[#156c65]' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>7 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('14-Days')} className={`${(planTime === '14-Days')? '!bg-[#c2f7f6] border-[3px] border-[#8df3f9] rounded-md !text-[#156c65]' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>14 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('30-Days')} className={`${(planTime === '30-Days')? 'bg-[#2d4069] border-[3px] border-[#81a7fa] rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>30 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                </div>
                <motion.div layout className='md:mt-5 md:grid grid-cols-2 gap-5 mt-3'>
                <AnimatePresence>
                    {
                        planDays.map((i) => <>
                        <motion.div
                        layout
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key={i?._id} 
                        className={`
                        ${(planTime === '7-Days')? "text-[#156c65] border-[#abf98d] bg-[#dbfbd7]" : "bg-primary text-white border-[#9df1e5]"} 
                        ${(planTime === '14-Days')? "text-[#156c65] border-[#8df3f9] bg-[#c2f7f6]" : "bg-primary text-white border-[#9df1e5]"} 
                        ${(planTime === '30-Days')? "text-white border-[#81a7fa] bg-[#2d4069]" : "bg-primary text-white border-[#9df1e5]"} 
                        p-2 mt-5 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl`}>

                            <div className='relative border-b pb-1'>
                                <div className='w-full flex items-start justify-start'>
                                    <div className='w-16'>
                                        {(i?.category === 'Free Plan') && <img src={plan1} className='w-[50px]' alt="task " />}
                                        {(i?.category === 'Life time Plan') && <img src={plan2} className='w-[50px]' alt="task " />}
                                        {(i?.category === 'Plan in time') && <img src={plan3} className='w-[50px]' alt="task " />}
                                    </div>
                                    <div className='w-full'>
                                        <h3 className='text-[16px] Uppercase font-bold'>{i?.planName}</h3>
                                        <p className='text-[12px]'>{i?.description}</p>
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0'>
                                    <h2 className={`${(i?.category === 'Free Plan')? 'text-accent' : 'text-accent' } font-bold`}>{i?.price} ৳</h2>
                                </div>
                                <div className='text-right flex items-center justify-end'>
                                    {(i?.planDuration) && <p className='text-[10px] mr-3'>{i?.planDuration}</p>}
                                    {(isActive(i?._id) === i?._id) && <p className='text-[12px]'>Expire Date: {isPlanDate(i?._id)}</p>}
                                </div>
                            </div>
                            <div className='flex items-end mt-3 justify-between'>
                                <div className=' flex items-center'>
                                    <h1 className='text-[12px] border-r pr-2 flex items-center gap-2'>Unit Price: <p>{i?.unitPrice}</p></h1>
                                    <h1 className='text-[12px] pl-2 flex items-center gap-2'>Daily Task: <p>{i?.dailyTask}</p></h1>
                                    <h1 className='text-[12px] pl-2 flex items-center gap-2'>Daily Task: <p>{i?.dailyTask}</p></h1>
                                </div>
                                {(isActive(i?._id) === i?._id) && PlanDateExpire(i?._id)}
                                {(isActive(i?._id) !== i?._id) && <label onClick={() => setActivePlan(i)} htmlFor='active-plan' className="btn w-[100px] btn-accent text-white btn-sm" disabled={me?.balance < i?.price}>Start</label>}
                                {(isActive(i?._id) === i?._id) && <button onClick={() => planAlert(i)} className="btn w-[100px] btn-accent text-white btn-success btn-sm">Active</button>}
                            </div>
                        </motion.div>
                    </>)
                    }
                </AnimatePresence>  
                </motion.div>
            </div> 
            { activePlan && 
                <ActivePlan 
                    activePlan={activePlan}
                    setActivePlan={setActivePlan}
                />
            } 
            { seeDetails && 
                <SeeDetailsPlan 
                seeDetails={seeDetails}
                    setSeeDetails={setSeeDetails}
                />
            } 
        </div>
    );
};

export default PlanDetails;