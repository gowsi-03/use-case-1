import dotenv from "dotenv";
import assert from "assert/strict";
import { createClient } from "contentful";
import { fetchBySlug } from "@contentful/experiences-sdk-react";

// Load env vars from .env.local (do this ONCE in entry files or setup scripts)
dotenv.config({ path: ".env.local" });

// Assert required environment variables
assert(process.env.CONTENTFUL_DELIVERY_TOKEN, "Missing CONTENTFUL_DELIVERY_TOKEN");
assert(process.env.CONTENTFUL_PREVIEW_TOKEN, "Missing CONTENTFUL_PREVIEW_TOKEN");
assert(process.env.CONTENTFUL_SPACE_ID, "Missing CONTENTFUL_SPACE_ID");
assert(process.env.CONTENTFUL_ENVIRONMENT, "Missing CONTENTFUL_ENVIRONMENT");
assert(process.env.EXPERIENCE_TYPE_ID, "Missing EXPERIENCE_TYPE_ID");

// Destructure after asserting
const {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  EXPERIENCE_TYPE_ID,
  NEXT_PUBLIC_CTFL_DOMAIN,
} = process.env;

const domain = NEXT_PUBLIC_CTFL_DOMAIN || "contentful.com";

const getConfig = (isPreview: boolean) => {
  return createClient({
    space: CONTENTFUL_SPACE_ID,
    environment: CONTENTFUL_ENVIRONMENT,
    accessToken: isPreview ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_DELIVERY_TOKEN,
    host: isPreview ? `preview.${domain}` : `cdn.${domain}`,
  });
};

export const getExperience = async (
  slug: string,
  localeCode: string,
  isPreview = false,
  isEditorMode = false,
) => {
  const client = getConfig(isPreview);

  try {
    const experience = await fetchBySlug({
      client,
      slug,
      experienceTypeId: EXPERIENCE_TYPE_ID,
      localeCode,
      isEditorMode,
    });

    return { experience };
  } catch (error) {
    return { experience: undefined, error: error as Error };
  }
};
