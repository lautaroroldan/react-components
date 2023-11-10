import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
// BLUE #1D90F5
// Grey #abb4c1
// Btn remove #9FA6AF
// Icons #43474c

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="#43474c" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M15 6l-6 6l6 6"></path>
    </svg>
)

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="#43474c" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 6l6 6l-6 6"></path>
    </svg>
)

const Calendar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="#9FA6AF" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
        <path d="M16 3v4"></path>
        <path d="M8 3v4"></path>
        <path d="M4 11h16"></path>
        <path d="M11 15h1"></path>
        <path d="M12 15v3"></path>
    </svg>
)



const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S',]

type DatePickerProps = {
    placeholder?: string
    minDate?: Date
    maxDate?: Date
    disabled?: boolean
}

function DatePicker({ placeholder: titleInput = 'select a day', minDate, maxDate, disabled = false }: DatePickerProps) {
    if (titleInput.trim() === '') {
        titleInput = 'select a day';
    }
    const placeholder = titleInput.charAt(0).toUpperCase() + titleInput.slice(1)

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | null>(null)
    const [selectedDay, setSelectedDay] = useState<Date>();

    function isDisabled(day: number) {
        if (disabled) return true
        if (minDate && new Date(2023, 9, day) < minDate) return true
        if (maxDate && new Date(2023, 9, day) > maxDate) return true
        return false
    }

    const ChevronDown = useMemo(() => {
        return <>
            <motion.svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="#43474c" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <motion.path
                    initial={{ rotate: 0 }}
                    animate={open ? { rotate: 180 } : { rotate: 0 }}
                    d="M6 9l6 6l6 -6"></motion.path>
            </motion.svg>
        </>
    }, [open])

    return (
        <div className='relative max-w-sm'>
            <section className='text-black font-lato relative z-10'>
                <button className={`bg-white flex w-full p-4 rounded-2xl gap-4  focus: outline-2 outline ${open ? 'outline-[#1D90F5]' : 'outline-[#ABB5C2]'} `} onClick={() => {
                    setOpen(!open)
                }}>
                    <Calendar />
                    <div className='flex-1 relative'>
                        <p
                            className='text-left relative top-1 focus:outline-0 cursor-pointer w-full font-semibold'>{selectedDay ? format(selectedDay, 'dd/MM/yy') : ''}</p>
                        <motion.p
                            initial={{ y: 0, x: 0, top: 0, }}
                            animate={selectedDay ? { y: -12, color: '#abb4c1' } : open ? { y: -12, } : { y: 0, color: '#abb4c1' }}
                            transition={{ duration: 0.1 }}
                            className={`absolute text-left  left-0 right-0 text-[#1D90F5] ${open && !selectedDay ? 'text-sm' : selectedDay ? 'text-base' : 'text-base'}`} >{placeholder}</motion.p>
                    </div>

                    {ChevronDown}
                </button>
            </section>



            <AnimatePresence >

                {open && (
                    <motion.section
                        initial={{ opacity: 0, y: -80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, type: 'spring' }}

                        className='absolute bg-white text-black font-lato top-16 right-0 left-0 py-4 px-6 rounded-2xl gap-4 z-0'>
                        <DayPicker
                            defaultMonth={selectedDay ?? new Date()}
                            required
                            captionLayout="dropdown-buttons"
                            fromYear={1950}
                            toYear={2025}
                            weekStartsOn={1}
                            mode="single"
                            showOutsideDays
                            selected={selectedDay}
                            onSelect={setSelectedDay}
                            classNames={{
                                day_selected: 'bg-[#f4f9fe] text-[#1D90F5] font-bold',
                                day_outside: 'text-[#abb4c1]',
                            }}
                            fixedWeeks
                            locale={es}
                        />
                        {/* 
                        <div
                            className='grid grid-cols-7 w-full gap-3'>
                            {days.map(day => (
                                <div key={crypto.randomUUID()} className='font-bold text-center w-8 h-8'>{day}</div>
                            ))}
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <button
                                    key={crypto.randomUUID()}
                                    onClick={() => {
                                        setDate(new Date(2019, 9, day))
                                    }}
                                    disabled={isDisabled(day)}
                                    className={` ${day == date?.getDate() ? 'bg-[#1D90F5] text-white  ' : 'hover:bg-[#f4f9fe] hover:text-[#1D90F5] '} ${minDate && new Date(2023, 9, day) < minDate ? 'text-[#9FA6AF] ' : 'text-black font-semibold '}  w-8 h-8 rounded-full text-center `}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                        <div className='flex items-center justify-center ml-2 gap-4 '>
                            <button
                                className='bg-[#9FA6AF] text-white rounded-3xl text-sm flex-1 h-9'
                                onClick={() => {
                                    setDate(null)
                                }}
                            >
                                Remove
                            </button>
                            <button
                                className='bg-[#1D90F5] text-white rounded-3xl text-sm flex-1 h-9'
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                Done
                            </button>
                        </div> */}

                    </motion.section>)}
            </AnimatePresence>

        </div>
    )
}

export default DatePicker