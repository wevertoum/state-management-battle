import { memo } from "react";
import { useChatTitlePage } from "~/stores/useChatOpenAiStore";

const TitlePageOpenAi = memo(function TitlePageOpenAi() {
	const titlePage = useChatTitlePage();

	return (
		<header className="px-4 py-3 border-b border-zinc-700">
			<div className="text-center text-white text-lg font-semibold">
				{titlePage}
			</div>
		</header>
	);
});

export { TitlePageOpenAi };
