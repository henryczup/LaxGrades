'use client'

import { useEffect, useState } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { calculateAverageGPA, calculatePercentageA } from '@/lib/utils';
import { ResponsiveBar } from "@nivo/bar";
import { useRouter } from 'next/navigation';
import { ClassData, GradeDistribution } from '@/lib/types';
import Link from 'next/link';
import Search from './search';

export default function ClassGraph({ classData, gpaDistributions }: { classData: ClassData, gpaDistributions: GradeDistribution[] }) {
    const router = useRouter();
    const [selectedInstructor, setSelectedInstructor] = useState<any>(undefined);
    const [selectedSemester, setSelectedSemester] = useState<any>(undefined);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedInstructor) params.set('instructor', selectedInstructor);
        if (selectedSemester) params.set('semester', selectedSemester);
        const url = `/class/${classData.code}?${params.toString()}`;
        router.push(url);
    }, [selectedInstructor, selectedSemester, classData.code, router]);


    if (!classData) {
        return <div>Loading...</div>;
    }

    const instructors = Array.from(
        new Set(
            gpaDistributions
                .map((dist) => dist.instructor)
                .filter((instructor): instructor is NonNullable<typeof instructor> => instructor !== null && instructor !== undefined)
        )
    );
    const semesters = Array.from(new Set(gpaDistributions.map(dist => dist.term)));

    const filteredDistributions = gpaDistributions.filter((dist) => {
        const instructorMatch =
            selectedInstructor === undefined || dist.instructor?.id === selectedInstructor;
        const semesterMatch = !selectedSemester || dist.term === selectedSemester;
        return instructorMatch && semesterMatch;
    });

    const aggregateDistribution = filteredDistributions.reduce((acc, dist) => {
        const grades = dist.grades as { [key: string]: number };
        Object.entries(grades).forEach(([grade, count]) => {
            acc[grade] = (acc[grade] || 0) + count;
        });
        return acc;
    }, {} as { [key: string]: number });

    const chartData = Object.entries(aggregateDistribution).map(([grade, count]) => ({
        name: grade,
        count,
    }));

    const selectedInstructorName = instructors.find((instructor) => instructor.id === selectedInstructor)?.name;

    return (
        <>
            <div className="bg-white p-8">
                <Search placeholder="Search for classes, instructors, or departments" />
                <div className="border-b border-red-800 pb-4 pt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{classData.name}</h1>
                    <p className="text-xl text-gray-600">
                        <Link href={`/department/${classData.code.slice(0, classData.code.search(/\d/))}`}>
                            <span className="text-red-800 hover:underline">{classData.code.slice(0, classData.code.search(/\d/))}</span>
                        </Link>
                        {classData.code.slice(classData.code.search(/\d/))}</p>
                </div>
                <div className="lg:grid lg:grid-cols-4 gap-16 mt-4">
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="instructors">
                                Instructors
                            </label>
                            <Select
                                value={selectedInstructor?.toString()}
                                onValueChange={(value) => setSelectedInstructor(value ? Number(value) : undefined)}
                            >
                                <SelectTrigger id="instructors" className="w-full">
                                    <SelectValue placeholder="All Instructors" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {instructors.map((instructor) => (
                                        <SelectItem key={instructor.id} value={instructor.id.toString()}>
                                            {instructor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="semesters">
                                Semesters
                            </label>
                            <Select
                                value={selectedSemester}
                                onValueChange={(value) => setSelectedSemester(value)}
                            >
                                <SelectTrigger id="semesters" className="w-full">
                                    <SelectValue placeholder="All Semesters" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {semesters.map(semester => (
                                        <SelectItem key={semester} value={semester}>
                                            {semester}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:col-span-3">
                        <div className="col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="text-lg font-semibold text-gray-900">
                                    {classData.name}: {!selectedInstructor && !selectedSemester && "Cumulative"} {selectedInstructor && (
                                        <Link href={`/instructor/${selectedInstructor}`} className="text-red-800 hover:underline">
                                            {selectedInstructorName}
                                        </Link>
                                    )}
                                </div>
                                {selectedSemester && <span className="ml-2 text-gray-600">({selectedSemester})</span>}
                            </div>
                            <BarChart className="w-full h-[500px]" data={chartData} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Entries</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {Object.values(aggregateDistribution).reduce((a, b) => a + b, 0)}
                                </p>
                            </div>
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {calculateAverageGPA(aggregateDistribution)}
                                </p>
                            </div>
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {calculatePercentageA(aggregateDistribution)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

interface BarChartProps {
    data: {
        name: string;
        count: number;
    }[];
    [key: string]: any;
}

function BarChart({ data, ...props }: BarChartProps) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={data}
                keys={["count"]}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#840024"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
            />
        </div>
    );
}