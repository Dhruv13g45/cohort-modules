import React from 'react'


//@ts-ignore
const CompaniesPage = async ({params}) => {

    const {companyName} = await params

    console.log(companyName)

  return (
    <div>CompaniesPage
        This is the example of catch all dynamic routes at once
        {companyName.join("/")}
        
    </div>
  )
}

export default CompaniesPage