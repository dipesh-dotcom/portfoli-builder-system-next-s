import { Template, TemplateCategory } from "@/types/template/templateTypes";

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: "1", name: "Minimal", slug: "minimal" },
  { id: "2", name: "Modern", slug: "modern" },
  { id: "3", name: "Creative", slug: "creative" },
  { id: "4", name: "Professional", slug: "professional" },
  { id: "5", name: "Dark", slug: "dark" },
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Minimal Dark",
    description: "Clean and minimal dark portfolio template",
    category: "minimal",
    thumbnail: "/minimal-dark-portfolio.jpg",
    code: `export default function MinimalDark() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-400">Full Stack Developer</p>
      </header>
      <main className="max-w-6xl mx-auto px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Project 1</h3>
              <p className="text-gray-400">Project description goes here</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Project 2</h3>
              <p className="text-gray-400">Project description goes here</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Modern Gradient",
    description: "Modern portfolio with gradient accents",
    category: "modern",
    thumbnail: "/modern-gradient-portfolio.jpg",
    code: `export default function ModernGradient() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">Jane Smith</h1>
          <p className="text-blue-100">Creative Designer & Developer</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Web App</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 h-40"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Mobile App</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 h-40"></div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Design System</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Professional Blue",
    description: "Professional corporate portfolio",
    category: "professional",
    thumbnail: "/professional-business-portfolio.jpg",
    code: `export default function ProfessionalBlue() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Portfolio</h1>
          <div className="flex gap-6 text-slate-600">
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Work</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-8 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Alex Johnson</h2>
          <p className="text-xl text-slate-600 mb-8">Strategic Technology Leader</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View My Work
          </button>
        </section>
      </main>
    </div>
  );
}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
