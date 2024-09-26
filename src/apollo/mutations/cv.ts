import { gql } from '@apollo/client';

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
    }
  }
`;

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
    }
  }
`;

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
    }
  }
`;

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
    }
  }
`;

export const EXPORT_CV_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;
