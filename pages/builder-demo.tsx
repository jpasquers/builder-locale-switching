import React from 'react';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { BuilderComponent } from '@builder.io/react';
import {builder} from '@builder.io/sdk';

const BuilderDemo: NextPage = (props: any) => {
  builder.init(props.builderPublicKey);
  console.log(props.locale);
  let ct = 0;
  return <BuilderComponent onStateChange={(state) => {
    console.log(`New state locale: ${state.locale}`);
    console.log(`BuilderComponentWrapper received state change`);
    console.log(`State change ${ct++}`);
}} model={props.targetModel} content={props.targetContent} locale={props.locale} />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const targetModel = "test-page";
  const targetUrl = (query?.url as string) || '/builderio/section-preview';
  const locale = "en";
  console.log(`THE LOCALE USED: ${locale}`);
  const builderPublicKey = "b1b2e26f288f4aa994419105b514c458";

  builder.init(builderPublicKey);

  const content = await builder
  // Get the page content from Builder with the specified options
    .get(targetModel, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/builder-demo",
      },
      locale: locale,
    })
  // Convert the result to a promise
  .toPromise();

  return {
      props: {
          locale,
          targetModel,
          targetContent: content === undefined ? null : content,
          registeredSSProps: true,
          builderPublicKey,
      },
  };
}

export default BuilderDemo
