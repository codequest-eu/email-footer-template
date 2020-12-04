import { AxiosInstance, AxiosRequestConfig } from "axios";
import * as yup from "yup";

export interface RequestConfig<R extends ResolvedResponse = EmptyResponse> {
  /**
   * Path to a collection or singleton resource, relative to the axios baseUrl
   *
   * https://jsonapi.org/recommendations/#urls
   */
  path: string;

  /**
   * Type of the resource
   *
   * https://jsonapi.org/format/#document-resource-object-identification
   */
  type: string;

  /**
   * Resource identifier, has to be unique within the resource type.
   * Omit for singleton resources and when creating resources within a collection.
   *
   * https://jsonapi.org/format/#document-resource-object-identification
   */
  id?: string;

  /**
   * Expected shape of the success response body, used to type the result and
   * validate backend responses to detect errors early.
   */
  responseSchema: yup.ObjectSchema<R>;

  /**
   * Axios instance to use for performing the request.
   *
   * https://github.com/axios/axios#creating-an-instance
   */
  axios?: AxiosInstance;

  /**
   * Additional axios configuration, useful for specifying extra headers
   * or request cancellation
   */
  axiosConfig?: AxiosRequestConfig;
}

/**
 * json:api POST configuration, used when creating a new resource
 *
 * https://jsonapi.org/format/#crud-creating
 */
export interface PostConfig<R extends ResolvedResponse = EmptyResponse>
  extends RequestConfig<R> {
  /**
   * Attributes of the resource
   *
   * https://jsonapi.org/format/#document-resource-object-attributes
   */
  attributes: UnknownRecord;

  /**
   * Relationships to create for the resource
   *
   * https://jsonapi.org/format/#document-resource-object-relationships
   */
  relationships?: {
    [Key: string]: ResourceIdentifier;
  };
}

/**
 * json:api patch configuration, used when updating a resource
 *
 * https://jsonapi.org/format/#crud-updating
 */
export type PatchConfig<
  T extends ResolvedResponse = EmptyResponse
> = PostConfig<T>;

/**
 * Specifies which related resources should be included in the response
 *
 * https://jsonapi.org/format/#fetching-includes
 */
export type IncludeParameter = {
  /**
   * Whether the related object should be included,
   * allows for including indirect relationships using an object
   */
  [relationship: string]: boolean | IncludeParameter;
};

/** json:api standard query parameters */
export interface QueryParameters {
  /**
   * Limit resources in the response to those that pass the given conditions
   *
   * https://jsonapi.org/format/#fetching-filtering
   */
  filter?: UnknownRecord;

  /**
   * Specifies the sort order of resources
   *
   * https://jsonapi.org/format/#fetching-sorting
   */
  sort?: string[];

  /**
   * For paginated resources, specifies the page number and size to fetch
   *
   * https://jsonapi.org/format/#fetching-pagination
   */
  pagination?: {
    number?: number;
    size?: number;
  };

  /**
   * Related resources which should be included in the response
   *
   * https://jsonapi.org/format/#fetching-includes
   */
  include?: IncludeParameter;

  /**
   * Limit resource attributes to the ones listed here
   *
   * https://jsonapi.org/format/#fetching-sparse-fieldsets
   */
  fields?: string[];
}

/**
 * json:api GET configuration, used when fetching a resource or a list of resources
 *
 * https://jsonapi.org/format/#fetching-resources
 */
export interface GetConfig<R extends ResolvedResponse = EmptyResponse>
  extends Omit<RequestConfig<R>, "type"> {
  /** Request query parameters */
  query?: QueryParameters;
}

/**
 * json:api DELETE configuration, used when removing a resource
 *
 * https://jsonapi.org/format/#crud-deleting
 */
export type DeleteConfig = Omit<
  RequestConfig<EmptyResponse>,
  "type" | "responseSchema"
>;

/**
 * json:api unique resource identifier
 *
 * https://jsonapi.org/format/#document-resource-object-identification
 */
export interface ResourceIdentifier {
  /** Type of the resource */
  type: string;

  /** Unique identifier within the resource type. */
  id: string;
}

/**
 * json:api resource relationship specification.
 * Either data or links has to be provided by the backend.
 *
 * https://jsonapi.org/format/#document-resource-object-relationships
 */
export interface Relationship {
  /** References to related resources */
  data?: ResourceIdentifier | ResourceIdentifier[] | null;

  /** URLs needed to fetch and manipulate the relationship */
  links?: {
    /** URL to fetch and manipulate the relationship */
    self?: string;
    /** URL to fetch the related resources */
    related?: string;
  };

  /** Additional metadata, eg. pagination information */
  meta?: unknown;
}

/**
 * json:api resource relationship with data replaced with a Resource or Resources
 * found in the included resources list.
 *
 * https://jsonapi.org/format/#fetching-includes
 */
export interface ResolvedRelationship extends Relationship {
  /** Related resources */
  data?: Resource | Resource[] | null;
}

/**
 * json:api resource
 *
 * https://jsonapi.org/format/#document-resource-objects
 */
export interface Resource extends ResourceIdentifier {
  /**
   * Resource attributes
   *
   * https://jsonapi.org/format/#document-resource-object-attributes
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  attributes: object;

  /**
   * Resource relationships
   *
   * https://jsonapi.org/format/#document-resource-object-relationships
   */
  relationships?: {
    [key: string]: Relationship | ResolvedRelationship;
  };

  /**
   * URLs to fetch and manipulate the resource
   *
   * https://jsonapi.org/format/#document-resource-object-links
   */
  links?: {
    /** URL to fetch and manipulate the resource */
    self?: string;
  };
}

/**
 * json:api response
 *
 * https://jsonapi.org/format/#document-structure
 */
export interface Response {
  data: Resource | Resource[] | null;
  included?: Resource[];
  meta?: unknown;
}

/** json:apu empty response, used by default when responseSchema is not specified */
export type EmptyResponse = { data: null };

/**
 * json:api response with references replaced with the resources found in the included list
 *
 * https://jsonapi.org/format/#fetching-includes
 */
export type ResolvedResponse = Omit<Response, "included">;
