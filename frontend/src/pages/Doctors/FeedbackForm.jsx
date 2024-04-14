import { useContext, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify'
import { authContext } from '../../context/AuthContext';
const FeedbackForm = () => {

    const { token } = useContext(authContext);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    const {id} = useParams();

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            if(!rating || !reviewText){
                setLoading(false);
                return toast.error('Rating & Review Field are required')
            }

            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({rating, reviewText})
            })

            const result = await res.json();

            if(!res.ok){
                throw new Error(result.message)
            }

            setLoading(false);
            toast.success(result.message);

        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    }

    return (
        <form action="">
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    How would you rate the overrall experience
                </h3>

                {/* 
                * Array(5).keys(): Đoạn mã này tạo ra một mảng có 5 phần tử (với các giá trị từ 0 đến 4) và sau đó trích xuất các key của mỗi phần tử.
                * map((_, index) => {...}): Đây là một phương thức map được gọi trên mảng 5 phần tử, trong đó mỗi phần tử sẽ là một nút "star". 
                * Callback function nhận vào hai tham số, nhưng ở đây chỉ sử dụng tham số thứ hai, tức là chỉ số của mỗi phần tử.
                * index += 1;: Dòng này tăng chỉ số của mỗi button lên một đơn vị. Điều này được thực hiện để đảm bảo chỉ số bắt đầu từ 1 thay vì 0.
                * return (...): Mỗi lần lặp qua, một nút "star" được tạo ra với các thuộc tính và sự kiện như onClick, onMouseEnter, onMouseLeave và onDoubleClick
                * onClick={() => setRating(index)}: Khi nút được nhấp, hàm setRating sẽ được gọi với index của nút.
                * onMouseEnter={() => setHover(index)}: Khi di chuột vào nút, hàm setHover sẽ được gọi với index của nút.
                * onMouseLeave={() => setHover(rating)}: Khi di chuột rời khỏi nút, hàm setHover sẽ được gọi với giá trị của rating.
                * onDoubleClick={() => {...}}: Khi double click vào nút, rating và hover sẽ được đặt về 0.
                */}
                <div>
                    {
                        [...Array(5).keys()].map((_, index) => {
                            index += 1;

                            return(
                                <button 
                                    key={index} 
                                    type='button' 
                                    className={`${
                                        index <= ((rating && hover) || hover)
                                        ? 'text-yellowColor' 
                                        : 'text-gray-400'
                                    } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                    onClick={() => setRating(index)} 
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    onDoubleClick={() => {
                                        setHover(0)
                                        setRating(0)
                                    }}
                                >
                                    <span>
                                        <AiFillStar />
                                    </span>
                                </button>
                            )
                        })
                    }
                </div>
            </div>

            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    Share your feedback of suggestion*
                </h3>

                <textarea 
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    rows="5"
                    placeholder='Write your message'
                    onChange={(e) => setReviewText(e.target.value)}
                >
                </textarea>
            </div>

            <button type='submit' onClick={handleSubmitReview} className='btn'>
                { loading ? <HashLoader size={25} color='#fff'/> : 'Submit Feedback' }
            </button>
        </form>
    )
}

export default FeedbackForm
