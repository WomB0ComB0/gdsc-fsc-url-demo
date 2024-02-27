import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

export const UrlFormContainer: React.FC<Readonly<{
  children: React.ReactNode
}>> = ({
  children
}) => {
    return (
      <Card
        className={`
      rounded-xl text-card-foreground max-w-[740px]  shadow flex flex-col items-center mx-auto h-fit min-h-[400px] max-h-[80%] bg-black bg-opacity-10 backdrop-filter backdrop-blur-[10px] border  border-black border-opacity-10 relative overflow-x-hidden z-10
      `}
      >
        <>
          <CardHeader>
            <CardTitle>
              Shorten a URL
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`
                flex flex-col items-center justify-center w-full h-full
            `}
          >
            {children}
          </CardContent>
        </>
      </Card>
    )
  }
