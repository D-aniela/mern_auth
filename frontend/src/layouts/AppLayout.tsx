import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getUser } from '../api/DevTreeAPI'
import DevTree from '../components/DevTree'

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 2, //Darle mas tiempo a que se ejecute la función
    refetchOnWindowFocus: false,
  })

  if (isLoading) return 'Cargando...'
  if (isError) {
    return <Navigate to={'/auth/login'} />
  }

  if (data) return <DevTree data={data} />
}
