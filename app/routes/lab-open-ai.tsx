import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
	MessageListOpenAi,
	PromptOpenAi,
	TitlePageOpenAi,
} from "~/components/openAi";
import { getSession } from "~/server/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const token = session.get("token") ?? "Tip: Lab Context API";
	return { token };
}

export default function LabOpenAi() {
	const { token } = useLoaderData() as { token: string };

	return (
		<main className="flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100">
			<TitlePageOpenAi />
			<div className="flex-1 overflow-y-auto px-4 py-6">
				<MessageListOpenAi />
			</div>
			<div className="border-t border-zinc-700 p-4 bg-zinc-900 sticky bottom-0">
				<PromptOpenAi apiToken={token} />
			</div>
		</main>
	);
}
