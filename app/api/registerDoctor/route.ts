import { externalHttp } from "@/app/configs/axiosConfig"

export const POST = async (req: Request) => {
   const body = await req.json()
   externalHttp.post("/", body)
      .then(res => {
         if (res.status === 201) {
            return new Response("user created successfully")
         }
      })
      .catch(err => {
         return new Response(JSON.stringify(err), {
            status: 400,
         })
      })
}