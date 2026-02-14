import { useState, useEffect } from "react";
import type { LinkHubProfile, LinkItem, SocialLink } from "@/types/links";
import { cn } from "@/utils/cn";
import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Code,
	Cog,
	Copy,
	FileText,
	Github,
	Globe,
	Menu,
	MessageCircle,
	MessagesSquare,
	Newspaper,
	Package,
	Server,
	Settings,
	ShoppingCart,
	Twitter,
	Users,
	Wrench,
	ExternalLink,
	Shield,
	AlertTriangle,
} from "lucide-react";
import { FixFXIcon } from "@/components/icons/FixFXIcon";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";

// Map icon string names to Lucide components
const iconMap: Record<string, React.ElementType> = {
	Globe,
	Package,
	Code,
	MessageCircle,
	Github,
	Twitter,
	FileText,
	Newspaper,
	BookOpen,
	Users,
	MessagesSquare,
	Server,
	Settings,
	Menu,
	Wrench,
	ExternalLink,
	Cog,
	ShoppingCart,
};

function getIcon(name?: string, className?: string) {
	if (!name) return null;

	// Check if it's an image path
	if (name.startsWith("/")) {
		return <img src={name} alt="icon" className={cn("size-7", className)} />;
	}

	// Otherwise, treat it as a Lucide icon name
	const Icon = iconMap[name];
	if (!Icon) return null;
	return <Icon className={cn("size-7", className)} />;
}

// Color map for background classes
const bgColorMap: Record<string, string> = {
	// Blues
	"bg-blue-400": "bg-blue-400/15 text-blue-300 border-blue-400/20",
	"bg-blue-500": "bg-blue-500/15 text-blue-400 border-blue-500/20",
	"bg-blue-600": "bg-blue-600/15 text-blue-400 border-blue-600/20",
	// Purples
	"bg-purple-500": "bg-purple-500/15 text-purple-400 border-purple-500/20",
	"bg-purple-600": "bg-purple-600/15 text-purple-400 border-purple-600/20",
	// Reds
	"bg-red-500": "bg-red-500/15 text-red-400 border-red-500/20",
	"bg-red-600": "bg-red-600/15 text-red-400 border-red-600/20",
	// Pinks
	"bg-pink-500": "bg-pink-500/15 text-pink-400 border-pink-500/20",
	"bg-pink-600": "bg-pink-600/15 text-pink-400 border-pink-600/20",
	"bg-rose-500": "bg-rose-500/15 text-rose-400 border-rose-500/20",
	// Oranges
	"bg-orange-500": "bg-orange-500/15 text-orange-400 border-orange-500/20",
	"bg-orange-600": "bg-orange-600/15 text-orange-400 border-orange-600/20",
	"bg-amber-500": "bg-amber-500/15 text-amber-400 border-amber-500/20",
	"bg-amber-600": "bg-amber-600/15 text-amber-400 border-amber-600/20",
	// Yellows
	"bg-yellow-500": "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
	// Greens
	"bg-green-500": "bg-green-500/15 text-green-400 border-green-500/20",
	"bg-green-600": "bg-green-600/15 text-green-400 border-green-600/20",
	"bg-emerald-500": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
	"bg-emerald-600": "bg-emerald-600/15 text-emerald-400 border-emerald-600/20",
	"bg-lime-500": "bg-lime-500/15 text-lime-400 border-lime-500/20",
	"bg-teal-500": "bg-teal-500/15 text-teal-400 border-teal-500/20",
	// Cyans
	"bg-cyan-500": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
	"bg-cyan-600": "bg-cyan-600/15 text-cyan-400 border-cyan-600/20",
	"bg-sky-500": "bg-sky-500/15 text-sky-400 border-sky-500/20",
	// Blues (indigo, violet)
	"bg-indigo-500": "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
	"bg-indigo-600": "bg-indigo-600/15 text-indigo-400 border-indigo-600/20",
	"bg-violet-500": "bg-violet-500/15 text-violet-400 border-violet-500/20",
	"bg-violet-600": "bg-violet-600/15 text-violet-400 border-violet-600/20",
	"bg-fuchsia-500": "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/20",
	// Grays
	"bg-gray-400": "bg-gray-400/15 text-gray-300 border-gray-400/20",
	"bg-gray-500": "bg-gray-500/15 text-gray-400 border-gray-500/20",
	"bg-gray-600": "bg-gray-600/15 text-gray-400 border-gray-600/20",
	"bg-gray-700": "bg-gray-500/15 text-gray-400 border-gray-500/20",
	"bg-gray-800": "bg-gray-500/15 text-gray-400 border-gray-500/20",
	"bg-slate-500": "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

// Accent glow colors
const glowColorMap: Record<string, string> = {
	// Blues
	"bg-blue-400": "shadow-blue-400/20",
	"bg-blue-500": "shadow-blue-500/20",
	"bg-blue-600": "shadow-blue-600/20",
	// Purples
	"bg-purple-500": "shadow-purple-500/20",
	"bg-purple-600": "shadow-purple-600/20",
	// Reds
	"bg-red-500": "shadow-red-500/20",
	"bg-red-600": "shadow-red-600/20",
	// Pinks
	"bg-pink-500": "shadow-pink-500/20",
	"bg-pink-600": "shadow-pink-600/20",
	"bg-rose-500": "shadow-rose-500/20",
	// Oranges
	"bg-orange-500": "shadow-orange-500/20",
	"bg-orange-600": "shadow-orange-600/20",
	"bg-amber-500": "shadow-amber-500/20",
	"bg-amber-600": "shadow-amber-600/20",
	// Yellows
	"bg-yellow-500": "shadow-yellow-500/20",
	// Greens
	"bg-green-500": "shadow-green-500/20",
	"bg-green-600": "shadow-green-600/20",
	"bg-emerald-500": "shadow-emerald-500/20",
	"bg-emerald-600": "shadow-emerald-600/20",
	"bg-lime-500": "shadow-lime-500/20",
	"bg-teal-500": "shadow-teal-500/20",
	// Cyans
	"bg-cyan-500": "shadow-cyan-500/20",
	"bg-cyan-600": "shadow-cyan-600/20",
	"bg-sky-500": "shadow-sky-500/20",
	// Blues (indigo, violet)
	"bg-indigo-500": "shadow-indigo-500/20",
	"bg-indigo-600": "shadow-indigo-600/20",
	"bg-violet-500": "shadow-violet-500/20",
	"bg-violet-600": "shadow-violet-600/20",
	"bg-fuchsia-500": "shadow-fuchsia-500/20",
	// Grays
	"bg-gray-400": "shadow-gray-400/15",
	"bg-gray-500": "shadow-gray-500/15",
	"bg-gray-600": "shadow-gray-600/15",
	"bg-gray-700": "shadow-gray-500/10",
	"bg-gray-800": "shadow-gray-500/10",
	"bg-slate-500": "shadow-slate-500/15",
};

interface LinkHubContentProps {
	profile: LinkHubProfile;
}

const LINKS_PER_PAGE = 8;

export default function LinkHubContent({ profile }: LinkHubContentProps) {
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<Record<string, number>>({});

	// Hash navigation effect
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1); // Remove '#'
			if (!hash) {
				setActiveCategory(null);
				return;
			}

			// Check if it's a category
			const category = profile.categories.find((cat) => cat.id === hash);
			if (category) {
				setActiveCategory(hash);
				return;
			}

			// Check if it's a link within a category (format: category/link-id)
			const [catId, linkId] = hash.split("/");
			const targetCategory = profile.categories.find((cat) => cat.id === catId);
			if (targetCategory && linkId) {
				setActiveCategory(catId);
				// Scroll to the link after a brief delay to ensure it's rendered
				setTimeout(() => {
					const linkElement = document.getElementById(`link-${linkId}`);
					linkElement?.scrollIntoView({ behavior: "smooth", block: "center" });
				}, 100);
			}
		};

		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, [profile.categories]);

	const handleCategoryChange = (categoryId: string | null) => {
		setActiveCategory(categoryId);
		setCurrentPage((prev) => ({ ...prev, [categoryId || "featured"]: 1 }));
		
		// Update URL hash
		if (categoryId) {
			window.location.hash = categoryId;
		} else {
			window.history.pushState("", document.title, window.location.pathname);
		}
	};

	const allVisibleLinks = activeCategory
		? profile.categories.find((cat) => cat.id === activeCategory)?.links || []
		: profile.featuredLinks;

	const categoryKey = activeCategory || "featured";
	const page = currentPage[categoryKey] || 1;
	const totalPages = Math.ceil(allVisibleLinks.length / LINKS_PER_PAGE);
	const startIndex = (page - 1) * LINKS_PER_PAGE;
	const endIndex = startIndex + LINKS_PER_PAGE;
	const visibleLinks = allVisibleLinks.slice(startIndex, endIndex);

	const handlePageChange = (newPage: number) => {
		setCurrentPage((prev) => ({ ...prev, [categoryKey]: newPage }));
		// Scroll to top of links section
		document.getElementById("links-section")?.scrollIntoView({ behavior: "smooth" });
	};

	const tabs = [
		{ id: null, label: "Featured" },
		...profile.categories.map((cat) => ({ id: cat.id, label: cat.name })),
		{ id: "disclaimer", label: "Disclaimer" },
	];

	return (
		<section className="min-h-screen flex flex-col items-center relative">
			<BackgroundEffects />

			<div className="container max-w-xl mx-auto px-4 py-16 sm:py-20 relative z-10">
				{/* Profile */}
				<div className="flex flex-col items-center text-center mb-10 animate-fade-in">
					<div className="relative mb-5 group">
						{/* Avatar */}
						<div className="size-24 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105">
							<FixFXIcon className="size-16" stroke="#3b82f6" />
						</div>
						{/* Glow behind avatar */}
						<div className="absolute -inset-2 bg-blue-500/15 rounded-2xl blur-xl z-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100" />
					</div>

					<h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
						<span className="bg-linear-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
							Fix
						</span>
						<span className="text-white">FX</span>
					</h1>
					<p className="text-blue-400/80 text-sm font-medium mb-3">
						{profile.title}
					</p>
					<p className="text-gray-400 max-w-md text-sm leading-relaxed">
						{profile.bio}
					</p>

					{/* Social Links */}
					<div className="flex flex-wrap justify-center gap-2.5 mt-5">
						{profile.socialLinks.map((social) => (
							<SocialButton key={social.id} social={social} />
						))}
					</div>
				</div>

				{/* Category tabs */}
				<div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up">
					{tabs.map((tab) => (
						<button
							key={tab.id ?? "featured"}
							type="button"
							id={tab.id ? `category-${tab.id}` : "category-featured"}
							className={cn(
								"px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
								activeCategory === tab.id
									? "bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-sm shadow-blue-500/10"
									: "bg-white/3 text-gray-400 border border-white/6 hover:bg-white/6 hover:text-gray-300 hover:border-white/10",
							)}
							onClick={() => handleCategoryChange(tab.id)}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Links / Disclaimer */}
				{activeCategory === "disclaimer" ? (
					<DisclaimerContent />
				) : (
					<>
						<div id="links-section" className="flex flex-col gap-3">
							{visibleLinks.map((link, index) => (
								<LinkCard key={link.id} link={link} index={index} categoryId={activeCategory} />
							))}
						</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-4 mt-6">
						<button
							type="button"
							onClick={() => handlePageChange(page - 1)}
							disabled={page === 1}
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
								page === 1
									? "opacity-40 cursor-not-allowed bg-white/3 text-gray-500"
									: "bg-white/3 text-gray-300 border border-white/6 hover:bg-white/6 hover:border-white/10",
							)}
						>
							<ChevronLeft className="size-4" />
							Previous
						</button>
						
						<div className="flex items-center gap-2">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
								<button
									key={pageNum}
									type="button"
									onClick={() => handlePageChange(pageNum)}
									className={cn(
										"size-8 rounded-lg text-sm font-medium transition-all duration-200",
										page === pageNum
											? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
											: "bg-white/3 text-gray-400 border border-white/6 hover:bg-white/6 hover:text-gray-300",
									)}
								>
									{pageNum}
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={() => handlePageChange(page + 1)}
							disabled={page === totalPages}
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
								page === totalPages
									? "opacity-40 cursor-not-allowed bg-white/3 text-gray-500"
									: "bg-white/3 text-gray-300 border border-white/6 hover:bg-white/6 hover:border-white/10",
							)}
						>
							Next
							<ChevronRight className="size-4" />
						</button>
					</div>
				)}

					</>
				)}

				{/* Branding */}
				<div className="mt-8 text-center space-y-2">
					<p className="text-[10px] text-gray-600/60 font-medium">
						💡 Tip: Use the copy button to share direct links to specific resources
					</p>
					<p className="text-[11px] text-gray-600 font-medium tracking-wider uppercase">
						Powered by <a href="https://fixfx.wiki" className="text-blue-500 hover:underline">FixFX</a> | Made with ❤️ by <a href="https://codemeapixel.dev" className="text-blue-500 hover:underline">CodeMeAPixel</a>
					</p>
				</div>
			</div>
		</section>
	);
}

function DisclaimerContent() {
	return (
		<div id="links-section" className="flex flex-col gap-4 animate-fade-in">
			{/* Header */}
			<div className="flex items-center gap-3 mb-2">
				<div className="size-10 rounded-xl flex items-center justify-center bg-amber-500/15 text-amber-400 border border-amber-500/20">
					<Shield className="size-5" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-gray-100">Disclaimer</h2>
					<p className="text-xs text-gray-500">Legal notices & attribution</p>
				</div>
			</div>

			{/* Affiliation */}
			<div className="rounded-xl bg-white/3 border border-white/6 p-4 space-y-2">
				<div className="flex items-center gap-2 mb-1">
					<AlertTriangle className="size-4 text-amber-400 shrink-0" />
					<h3 className="text-sm font-medium text-gray-200">No Affiliation</h3>
				</div>
				<p className="text-xs text-gray-400 leading-relaxed">
					FixFX is an <span className="text-gray-300 font-medium">independent, community-driven project</span> and is not affiliated with, endorsed by, or officially connected to Cfx.re, Rockstar Games, Take-Two Interactive, or any of their subsidiaries or affiliates.
				</p>
			</div>

			{/* Trademarks & Logos */}
			<div className="rounded-xl bg-white/3 border border-white/6 p-4 space-y-2">
				<h3 className="text-sm font-medium text-gray-200">Trademarks & Logos</h3>
				<p className="text-xs text-gray-400 leading-relaxed">
					All logos, trademarks, brand names, and visual assets displayed on this site are the property of their respective owners. This includes but is not limited to FiveM, RedM, Cfx.re, txAdmin, vMenu, ESX, QBCore, Qbox, VORP, and any other third-party projects referenced.
				</p>
				<p className="text-xs text-gray-400 leading-relaxed">
					Their use here is purely for <span className="text-gray-300 font-medium">identification and informational purposes</span> and does not imply any ownership, sponsorship, or endorsement.
				</p>
			</div>

			{/* Content */}
			<div className="rounded-xl bg-white/3 border border-white/6 p-4 space-y-2">
				<h3 className="text-sm font-medium text-gray-200">Content & Accuracy</h3>
				<p className="text-xs text-gray-400 leading-relaxed">
					While we strive to provide accurate and up-to-date information, FixFX makes no guarantees regarding the completeness or accuracy of the content provided. Documentation, guides, and resources are maintained by community contributors and may not reflect the latest official changes.
				</p>
			</div>

			{/* Links */}
			<div className="rounded-xl bg-white/3 border border-white/6 p-4 space-y-2">
				<h3 className="text-sm font-medium text-gray-200">External Links</h3>
				<p className="text-xs text-gray-400 leading-relaxed">
					This site contains links to external websites and resources that are not operated by FixFX. We have no control over the content or availability of these sites and accept no responsibility for them.
				</p>
			</div>

			{/* Contact */}
			<div className="rounded-xl bg-white/3 border border-white/6 p-4 space-y-2">
				<h3 className="text-sm font-medium text-gray-200">Contact</h3>
				<p className="text-xs text-gray-400 leading-relaxed">
					If you believe any content on this site infringes on your intellectual property or if you have any concerns, please reach out via our{" "}
					<a href="https://discord.gg/cYauqJfnNK" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Discord server</a>{" "}
					or open an issue on{" "}
					<a href="https://github.com/CodeMeAPixel/FixFX" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">GitHub</a>.
				</p>
			</div>
		</div>
	);
}

function SocialButton({ social }: { social: SocialLink }) {
	const mapped = bgColorMap[social.color || ""] || "bg-white/5 text-gray-300";

	return (
		<a
			href={social.url}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"p-2.5 rounded-xl border backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:-translate-y-0.5",
				mapped,
			)}
			title={social.title}
		>
			{getIcon(social.icon, "size-[18px]")}
		</a>
	);
}

function LinkCard({ link, index, categoryId }: { link: LinkItem; index: number; categoryId: string | null }) {
	const iconMapped =
		bgColorMap[link.color || ""] || "bg-white/5 text-gray-300 border-white/10";
	const glow = glowColorMap[link.color || ""] || "";

	const handleCopyLink = async () => {
		const deepLink = categoryId 
			? `${window.location.origin}${window.location.pathname}#${categoryId}/${link.id}`
			: `${window.location.origin}${window.location.pathname}#featured/${link.id}`;
		
		try {
			await navigator.clipboard.writeText(deepLink);
			// Optional: Add toast notification here
		} catch (err) {
			console.error("Failed to copy link:", err);
		}
	};

	const handleVisitLink = () => {
		if (link.url.startsWith("http")) {
			window.open(link.url, "_blank", "noopener,noreferrer");
		} else {
			window.location.href = link.url;
		}
	};

	return (
		<div
			id={`link-${link.id}`}
			className={cn(
				"group relative overflow-hidden rounded-xl transition-all duration-300",
				"bg-white/3 border border-white/6",
				"hover:bg-white/6 hover:border-white/10",
				glow,
			)}
			style={{
				animationDelay: `${index * 80}ms`,
			}}
		>
			{/* Accent gradient bar */}
			<div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="p-4 flex items-center gap-4">
				{link.icon && (
					<div
						className={cn(
							"size-11 rounded-xl flex items-center justify-center border transition-all duration-300",
							iconMapped,
						)}
					>
						{getIcon(link.icon, "size-5")}
					</div>
				)}

				<div className="flex-1 min-w-0">
					<h3 className="font-medium text-[15px] text-gray-100">
						{link.title}
					</h3>
					{link.description && (
						<p className="text-xs text-gray-500 truncate mt-0.5">
							{link.description}
						</p>
					)}
				</div>

				{/* Action buttons */}
				<div className="flex items-center gap-2 shrink-0">
					<button
						type="button"
						onClick={handleCopyLink}
						className={cn(
							"p-2 rounded-lg border transition-all duration-200",
							"bg-white/5 text-gray-400 border-white/10",
							"hover:bg-white/10 hover:text-blue-400 hover:border-blue-500/30",
							"active:scale-95",
						)}
						title="Copy shareable link"
					>
						<Copy className="size-4" />
					</button>
					
					<button
						type="button"
						onClick={handleVisitLink}
						className={cn(
							"p-2 rounded-lg border transition-all duration-200",
							"bg-blue-500/10 text-blue-400 border-blue-500/20",
							"hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/40",
							"active:scale-95",
						)}
						title="Visit link"
					>
						<ExternalLink className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
