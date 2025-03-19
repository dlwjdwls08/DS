'use client'


import axios from "axios"
import { useEffect, useState } from "react"

interface Review {
	subject : string;
	content : string;
}

export default function ListPage() {
	const [data, setData] = useState<Array<Review>>([]);
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");


	useEffect(() => {
		axios.get('/api/review')
			.then((res) => res.data)
			.then((data) => setData(data))
	}, []);

	async function postReview(r : Review) {
		axios.post('/api/review',{
			subject : r.subject,
			content : r.content
		})
		.then((res) => res.data)
	}

	return (
		<div>
			{/* 리뷰 쓰기 */}
			<div>	
				<input 
					type="text" 
					placeholder="수강 과목"
					value={subject}	
					onChange={(v1) => setSubject(v1.target.value)}
					/>
				<input 
					type="text" 
					placeholder="당신의 후기"
					value={content}	
					onChange={(v) => setContent(v.target.value)}
					/>
				<input type="button"
					value="리뷰 등록"
					onClick={() => {
						postReview({ subject, content })
						.then(() => axios.get('/api/review'))
						.then((res) => res.data)
						.then((data) => setData(data))
						setSubject("");
						setContent("");
					}}
					/>
				</div>

			{/* 리뷰 띄워주기 */}
			{data.map((review, index) => (
				<div key={index}>
					<p>subject: {review.subject}</p>
					<p>content: {review.content}</p>
				</div>
			))}
    </div>
	)

}
