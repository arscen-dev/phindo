export type Template = {
  sid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  fileSid: string;
};

export type TemplateDataInput = {
  name: string;
  description: string | null;
  fileSid: string;
};

export type TemplateRole = {
  sid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  templateSid: string;
};

export type TemplateRoleDataInput = {
  name: string;
  templateSid: string;
};

export type TemplateField = {
  sid: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  templateSid: string;
  templateRoleSid: string;
  required: boolean;
  placeholder: string | null;
};

export type TemplateFieldDataInput = {
  name: string;
  templateSid: string;
  templateRoleSid: string;
  required: boolean;
  placeholder: string | null;
};

export type TemplateToUser = {
  templateSid: string;
  userSid: string;
};

export type TemplateToUserDataInput = {
  templateSid: string;
  userSid: string;
};
