import Libraries from "@components/Libraries"

export default function Home() {
  return (
    <div className="flex-center flex-col mt-24 px-12">
      <h1 className="head_title text-center">Manage your to do lists <br /> <span className="text-orange-500">all in one place</span></h1>
      <div className="desc">A tool for visualising , organising and tracking all the work you do</div>

      <Libraries />
    </div>
  )
}
