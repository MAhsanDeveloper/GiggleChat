import React, { Suspense } from "react";
import useGetConversations from "../../hooks/useGetConversations";

const Conversation = React.lazy(() => import("./Conversation"));

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<Suspense fallback={<span className='loading loading-spinner mx-auto'></span>}>
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
		</Suspense>
	);
};
export default Conversations;
