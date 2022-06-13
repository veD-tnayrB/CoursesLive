import React from 'react';

import './listOfDays.scss';


const ListOfDays = ({ value, stateToUpdate }) => {

    // Handle the checkboxes changes
    const handleDaySelection = (event) => {
        const { name, checked } = event.target;

        stateToUpdate(prevData => {
            if (checked) {
                // Add the item (name) to days
                return (
                    {
                        ...prevData,
                        days: [...prevData.days, name]
                    } 
                )
            }

            // Delete de item (name) from days
            return (
                {
                    ...prevData,
                    days: prevData.days.filter(day => day !== name)
                }
            )
        })
    }

    return (
        <div className="list-of-days">
            <ol>
                <li>
                    <input
                     type="checkbox"
                     name="Monday"
                     checked={value.some(item => item === "Monday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Monday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Tuesday"
                     checked={value.some(item => item === "Tuesday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Tuesday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Wednesday"
                     checked={value.some(item => item === "Wednesday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Wednesday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Thursday"
                     checked={value.some(item => item === "Thursday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Thursday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Friday"
                     checked={value.some(item => item === "Friday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Friday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Saturday"
                     checked={value.some(item => item === "Saturday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Saturday</span>
                    </label>
                </li>

                <li>
                    <input
                     type="checkbox"
                     name="Sunday"
                     checked={value.some(item => item === "Sunday")}
                     onChange={handleDaySelection}
                    />
                    <label>
                        <span>Sunday</span>
                    </label>
                </li>
            </ol>
        </div>       
    )
}

export default ListOfDays;