import { ImageResponse } from "next/og";
import { getAllBlogPostData } from "src/app/(public)/blog/helpers";

interface OGParams {
	title: string;
}

export const generateStaticParams = async (): Promise<OGParams[]> => {
	const blogPosts = await getAllBlogPostData();
	const blogTitles = blogPosts.map((post) => ({
		title: encodeURIComponent(post.metadata.title),
	}));

	return [{ title: "ianduvall.com" }, ...blogTitles];
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<OGParams> },
) {
	const { title: encodedTitle } = await params;
	const title = decodeURIComponent(encodedTitle);

	return new ImageResponse(
		<div
			tw="flex flex-col w-full h-full items-center justify-center bg-white"
			style={{
				background: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
			}}
		>
			<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
				<h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
					{title}
				</h2>
			</div>
		</div>,
		{
			width: 800,
			height: 400,
		},
	);
}
