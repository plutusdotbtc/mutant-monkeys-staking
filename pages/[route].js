import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

export default function ResolveRoute({route}) {
  const router = useRouter()
  console.log("First", route)

  useEffect(() => {
    console.log("Finding page", route)

    if (route !== route.toLowerCase()) {
      router.push(route.toLowerCase())
    }
  },[router])

  return <Error statusCode={404} />
}

export async function getServerSideProps(context) {
  let route = context.query.route
  return {
      props: { route }
  }
}