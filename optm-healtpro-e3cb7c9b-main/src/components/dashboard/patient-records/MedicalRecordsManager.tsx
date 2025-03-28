import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Filter, ArrowUpDown, Download, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFromLocalStorage, storeInLocalStorage } from '@/services/storage/localStorageService';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import AddRecordDialog from '../patient-history/AddRecordDialog';
import { RecordFormData } from '../patient-history/types';
import { v4 as uuidv4 } from 'uuid';

interface MedicalRecord {
  id: string;
  patientId: string;
  name: string;
  date: string;
  type: string;
  recordType?: string;
  notes?: string;
  fileId?: string;
  timestamp: string;
}

interface MedicalReport {
  id: string;
  patientId?: string;
  title: string;
  date: string;
  fileType: string;
  fileSize: string;
  fileId?: string;
}

interface MedicalRecordsManagerProps {
  patientId?: string;
  onRecordUpdated?: () => void;
}

export const MedicalRecordsManager: React.FC<MedicalRecordsManagerProps> = ({
  patientId,
  onRecordUpdated
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [recordType, setRecordType] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentRecordType, setCurrentRecordType] = useState('');
  const [recordForm, setRecordForm] = useState<RecordFormData>({
    name: '',
    date: '',
    type: '',
    notes: '',
    file: null
  });

  useEffect(() => {
    loadData();
  }, [patientId]);

  const loadData = () => {
    try {
      const storedRecords = getFromLocalStorage('patient_records')
        .filter((record: any) => !patientId || record.patientId === patientId)
        .map((record: any) => ({
          id: record.id,
          patientId: record.patientId,
          name: record.name,
          date: record.date,
          type: record.type || 'record',
          recordType: record.recordType,
          notes: record.notes,
          fileId: record.fileId,
          timestamp: record.timestamp || record.createdAt
        }));

      const storedReports = getFromLocalStorage('patient_reports')
        .filter((report: any) => !patientId || report.patientId === patientId)
        .map((report: any) => ({
          id: report.id,
          patientId: report.patientId,
          title: report.title,
          date: report.date,
          fileType: report.fileType,
          fileSize: report.fileSize,
          fileId: report.fileId
        }));

      setRecords(storedRecords);
      setReports(storedReports);
    } catch (error) {
      console.error('Error loading medical data:', error);
      toast.error('Failed to load records');
    }
  };

  const handleRecordTypeChange = (value: string) => {
    setRecordType(value);
  };

  const handleSort = (field: 'date' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleAddRecord = (type: string) => {
    setCurrentRecordType(type);
    setIsAddDialogOpen(true);
    
    setRecordForm({
      name: '',
      date: new Date().toISOString().split('T')[0],
      type: '',
      notes: '',
      file: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecordForm({
      ...recordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRecordForm({
        ...recordForm,
        file: e.target.files[0]
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setRecordForm({
      ...recordForm,
      type: value
    });
  };

  const handleRecordSubmit = async () => {
    try {
      const recordId = uuidv4();
      let fileId = null;
      
      if (recordForm.file) {
        fileId = uuidv4();
      }
      
      const newRecord: any = {
        id: recordId,
        patientId: patientId || 'default',
        name: recordForm.name,
        date: recordForm.date,
        type: currentRecordType,
        recordType: recordForm.type || currentRecordType,
        notes: recordForm.notes,
        fileId: fileId,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      const existingRecords = getFromLocalStorage('patient_records');
      storeInLocalStorage('patient_records', [...existingRecords, newRecord]);
      
      setRecords(prev => [...prev, newRecord]);
      
      setIsAddDialogOpen(false);
      
      toast.success('Record added successfully');
      
      if (onRecordUpdated) {
        onRecordUpdated();
      }
      
    } catch (error) {
      console.error('Error adding record:', error);
      toast.error('Failed to add record');
    }
  };

  const handleDeleteRecord = (id: string, isReport: boolean = false) => {
    try {
      if (isReport) {
        const updatedReports = reports.filter(report => report.id !== id);
        const storedReports = getFromLocalStorage('patient_reports')
          .filter((report: any) => report.id !== id);
        
        storeInLocalStorage('patient_reports', storedReports);
        setReports(updatedReports);
      } else {
        const updatedRecords = records.filter(record => record.id !== id);
        const storedRecords = getFromLocalStorage('patient_records')
          .filter((record: any) => record.id !== id);
        
        storeInLocalStorage('patient_records', storedRecords);
        setRecords(updatedRecords);
      }
      
      toast.success('Record deleted successfully');
      
      if (onRecordUpdated) {
        onRecordUpdated();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('Failed to delete record');
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (record.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = recordType === 'all' || record.type === recordType;
    return matchesSearch && matchesType;
  });

  const filteredReports = reports.filter(report => {
    return report.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    }
  });

  const combinedData = [
    ...sortedRecords.map(record => ({
      id: record.id,
      name: record.name,
      date: record.date,
      type: record.recordType || record.type,
      isReport: false
    })),
    ...sortedReports.map(report => ({
      id: report.id,
      name: report.title,
      date: report.date,
      type: report.fileType,
      isReport: true
    }))
  ].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Medical Records Manager</CardTitle>
        <CardDescription>
          Manage and view all patient medical records and documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Record
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAddRecord('xray')}>
                    X-Ray or Scan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddRecord('bloodTest')}>
                    Blood Test
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddRecord('medication')}>
                    Medication
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddRecord('clinicalNote')}>
                    Clinical Note
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search records..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={recordType} onValueChange={handleRecordTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Filter by type</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="xray">X-Ray/Scans</SelectItem>
                  <SelectItem value="bloodTest">Blood Tests</SelectItem>
                  <SelectItem value="medication">Medications</SelectItem>
                  <SelectItem value="clinicalNote">Clinical Notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {combinedData.length > 0 ? (
                    combinedData.map(item => (
                      <TableRow key={`${item.isReport ? 'report' : 'record'}-${item.id}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(new Date(item.date), 'PPP')}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {item.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRecord(item.id, item.isReport)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-4">
                          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                          {searchTerm ? (
                            <p className="text-muted-foreground">No records matching your search</p>
                          ) : (
                            <>
                              <p className="font-medium">No records found</p>
                              <p className="text-muted-foreground mb-4">Add your first medical record</p>
                              <Button size="sm" onClick={() => handleAddRecord('clinicalNote')}>
                                Add Record
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="records" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Record Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecords.length > 0 ? (
                    sortedRecords.map(record => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            {record.name}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(new Date(record.date), 'PPP')}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {record.recordType || record.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRecord(record.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-4">
                          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                          {searchTerm ? (
                            <p className="text-muted-foreground">No records matching your search</p>
                          ) : (
                            <>
                              <p className="font-medium">No medical records found</p>
                              <p className="text-muted-foreground mb-4">Add your first medical record</p>
                              <Button size="sm" onClick={() => handleAddRecord('clinicalNote')}>
                                Add Medical Record
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Report Name</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReports.length > 0 ? (
                    sortedReports.map(report => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            {report.title}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(new Date(report.date), 'PPP')}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {report.fileType}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRecord(report.id, true)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center py-4">
                          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                          {searchTerm ? (
                            <p className="text-muted-foreground">No reports matching your search</p>
                          ) : (
                            <>
                              <p className="font-medium">No lab reports found</p>
                              <p className="text-muted-foreground mb-4">Upload your first lab report</p>
                              <Button size="sm" onClick={() => handleAddRecord('bloodTest')}>
                                Add Lab Report
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <AddRecordDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        recordType={currentRecordType}
        recordForm={recordForm}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleRecordSubmit}
      />
    </Card>
  );
};

export default MedicalRecordsManager;
