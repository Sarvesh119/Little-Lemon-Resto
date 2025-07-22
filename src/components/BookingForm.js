import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';

function BookingForm(props) {

    const today = new Date();

    const formik = useFormik({
        initialValues: {
            date: formatDate(today),
            time: props.availableTimes.length > 0 ? props.availableTimes[0] : '',
            guestsAmount: 1,
            resOccasion: 'Birthday',
        },
        onSubmit: values => {
            // e.preventDefault();
            console.log("Form sent");
            console.log(`Date : ${date}, Time: ${time}, Guest: ${guestsAmount}, Occasion: ${resOccasion}`)
            const datas = [date, time, guestsAmount, resOccasion];
            const dataSubmitted = props.submitForm(datas);

            if (dataSubmitted) {
                navigate("/confirm");
            }
        },
        validationSchema: Yup.object({
            date: Yup.date().required("Required").min(formatDate(today)),
            time: Yup.string().required("Required"),
            guestsAmount: Yup.number().required("Required").positive().integer().min(1, 'The minimum amount of guests is 1.').max(10, 'The maximum amount of guests is 10.'),
            resOccasion: Yup.string().required("Required"),
        }),
    });

    const navigate = useNavigate();

    const occasions = [
        "Birthday",
        "Anniversary",
        "Wedding",
        "New Year",
        "Graduation"
    ];

    function formatDate(date) {
    return date.toISOString().split("T")[0];
    }

    const [date, setDate] = useState(formatDate(today));
    const [time, setTime] = useState(props.availableTimes.length > 0 ? props.availableTimes[0] : '');
    const [guestsAmount, setGuestAmount] = useState(1);
    const [resOccasion, setResOccasion] = useState('Birthday');

    const timesOptions = props.availableTimes.map((time) => <option key={time}>{time}</option>);
    const occasionOptions = occasions.map((occasion) => <option key={occasion}>{occasion}</option>);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form sent");
        console.log(`Date : ${date}, Time: ${time}, Guest: ${guestsAmount}, Occasion: ${resOccasion}`)
        const datas = [date, time, guestsAmount, resOccasion];
        const dataSubmitted = props.submitForm(datas);

        if (dataSubmitted) {
            navigate("/confirm");
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-div">
                <label htmlFor="date" className="lead-text">
                    Choose date
                </label>
                <input
                type="date"
                name="date"
                id="date"
                onChange={(e) => {
                    setDate(e.target.value);
                    props.dispatch({type: 'UPDATE_TIMES', payload: e.target.value});
                }}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.date}
                required
                />
                {formik.touched.date && formik.errors.date && (
                <div className="error">{formik.errors.date}</div>
                )}
            </div>
            <div className="form-div">
                <label htmlFor="res-time" className="lead-text">
                    Choose time
                </label>
                <select
                id="res-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required>
                    {timesOptions};
                </select>
                {formik.touched.timesOptions && formik.errors.timesOptions && (
                <div className="error">{formik.errors.timesOptions}</div>
                )}
            </div>
            <div className="form-div">
                <label htmlFor="guests" className="lead-text">
                    Number of guests
                </label>
                <input
                type="number"
                placeholder="Guests"
                min={1}
                max={10}
                id="guests"
                // value={guestsAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps("guestsAmount")}
                required
                />
                {formik.touched.guestsAmount && formik.errors.guestsAmount && (
                <div className="error">{formik.errors.guestsAmount}</div>
                )}
            </div>
            <div className="form-div">
                <label htmlFor="occasion" className="lead-text">
                    Occasion
                </label>
                <select
                id="occasion"
                value={resOccasion}
                onChange={(e) => setResOccasion(e.target.value)}
                required>
                    {occasionOptions}
                </select>
                {formik.touched.resOccasion && formik.errors.resOccasion && (
                <div className="error">{formik.errors.resOccasion}</div>
                )}
            </div>
            <div className="form-div">
                <button type="submit" aria-label="Submit booking form" style={{margin:"auto"}} className='button-normal section-category'>Confirm booking</button>
            </div>
        </form>
    );
}

export default BookingForm;
