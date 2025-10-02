export class DocumentRCModel  {
    DocId: number;
    RecordId: number;
    ArchiveTypeId: number;
    Name: string;
    Code: string;
    Status: number;
    Description : string;
    Metadata: metadataDOC[]
    Attachment: attachmentDoc
}
export class attachmentDoc{
    Id: number;
    DocumentId: number;
    NodeId: number;
    FileName: string;
    Filesize: number;
    Filepath: string;
    CreatedByUserId: number;
    CreatedOnDate: Date;
    LastModifiedByUserId: number;
    LastModifiedOnDate: Date;
}
export class metadataDOC {
    Id: number;
    DocumentId: number;
    ArchiveTypeId: number;
    FieldId: number;
    FieldCode: string;
    Value: string;
}