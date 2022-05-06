import { templates } from 'utils/templates';

export const HEAD_TEMPLATE_ID = 0;
export const getSignatureMessage = (login) => templates[login.params.templateId](login);