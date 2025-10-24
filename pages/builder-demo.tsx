import React from 'react';

import { GetServerSideProps } from 'next';

import { BuilderComponent } from '@builder.io/react';
import { builder, BuilderContent } from '@builder.io/sdk';

import './custom-component';


export type SectionPreviewProps = {
    targetModel: string;
    targetContent: BuilderContent;
    builderPublicKey: string;
    locale: string;
};

// Builder Public API Key set in .env file


export function loadTargetData(targetSection: string, targetUrl: string, targetLocale: string) {
    return builder
        .get(targetSection, {
            userAttributes: {
                // Use the page path specified in the URL to fetch the content
                urlPath: targetUrl,
            },
            locale: targetLocale,
            // Set prerender to false to return JSON instead of HTML
            prerender: false,
        })
        .toPromise();
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    builder.init("b1b2e26f288f4aa994419105b514c458");

    const { query } = context;
    const targetModel = "test-page";
    const targetUrl = (query?.url as string) || '/builderio/section-preview';
    const locale = 'en';
    const targetContent = await loadTargetData(targetModel, targetUrl, locale);
    const builderPublicKey = "b1b2e26f288f4aa994419105b514c458";

    return {
        props: {
            locale,
            targetModel,
            targetContent: targetContent === undefined ? null : targetContent,
            builderPublicKey,
        },
    };
};

/**
 * Supports rendering a model bound to a particular locale as a standalone page,
 * for use within the visual editor.
 */
const SectionPreviewPage = (props: SectionPreviewProps) => {
    builder.init("b1b2e26f288f4aa994419105b514c458");
    let ct = 0;
    console.log(`Builder component re-render`)
    return (
        <BuilderComponent
            onStateChange={(state) => {
                console.trace();
                console.log(`New state locale: ${state.locale}`);
                console.log(`BuilderComponentWrapper received state change`);
                console.log(`State change ${ct++}`);
            }}
            content={props.targetContent}
            model={props.targetModel}
            locale={props.locale}
        />
    );
};

export default SectionPreviewPage;
