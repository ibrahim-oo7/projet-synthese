<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            background: #f5f7fa;
            padding: 40px;
        }

        .certificate {
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            border: 1px solid #e9ecef;
            position: relative;
        }

        .border {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 1px solid #15BE6A;
            opacity: 0.2;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
        }

        .logo {
            font-size: 20px;
            font-weight: bold;
            color: #1a2a3a;
        }

        .badge {
            font-size: 12px;
            color: #15BE6A;
            border: 1px solid #15BE6A;
            padding: 5px 10px;
            border-radius: 20px;
        }

        .title {
            text-align: center;
        }

        .title h1 {
            color: #15BE6A;
            letter-spacing: 2px;
        }

        .title p {
            color: #6c757d;
            font-size: 12px;
        }

        .student {
            text-align: center;
            margin-top: 20px;
        }

        .student h2 {
            font-size: 32px;
            margin: 10px 0;
        }

        .underline {
            width: 80px;
            height: 3px;
            background: #15BE6A;
            margin: 0 auto;
        }

        .course {
            text-align: center;
            margin-top: 20px;
            font-size: 22px;
            font-weight: bold;
            color: #15BE6A;
        }

        .center-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
        }

        .details {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            text-align: center;
        }

        .card {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 8px;
            width: 30%;
        }

        .grade {
            text-align: center;
            margin-top: 20px;
        }

        .circle {
            width: 70px;
            height: 70px;
            background: #15BE6A;
            border-radius: 50%;
            color: #fff;
            line-height: 70px;
            font-size: 24px;
            margin: auto;
        }

        .footer {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
        }

        .line {
            width: 150px;
            height: 2px;
            background: #000;
            margin: auto;
        }

        .id {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>

<body>

<div class="certificate">
    <div class="border"></div>

    <div class="header">
        <div class="logo">FormInnova</div>
        <div class="badge">Certificate of Completion</div>
    </div>

    <div class="title">
        <h1>CERTIFICATE</h1>
        <p>OF ACHIEVEMENT</p>
    </div>

    <div class="student">
        <p>This certificate is proudly presented to</p>
        <h2>{{ $student_name }}</h2>
        <div class="underline"></div>
    </div>

    <div class="course">
        {{ $course_name }}
    </div>

    <div class="center-box">
        <div>
            <strong>{{ $center_name }}</strong><br>
            <small>Education Center</small>
        </div>
        <div>
            <strong>{{ $center_location }}</strong><br>
            <small>Location</small>
        </div>
    </div>

    <div class="details">
        <div class="card">
            Duration<br>
            <strong>40h</strong>
        </div>
        <div class="card">
            Instructor<br>
            <strong>{{ $instructor }}</strong>
        </div>
        <div class="card">
            Score<br>
            <strong>{{ $score }}%</strong>
        </div>
    </div>

    <div class="grade">
        <div class="circle">{{ $grade }}</div>
        <small>Grade</small>
    </div>

    <div class="footer">
        <div>
            <div class="line"></div>
            <small>FormInnova Team</small>
        </div>

        <div>
            <strong>{{ $issued_at }}</strong><br>
            <small>Date Issued</small>
        </div>
    </div>

    <div class="id">
        ID: {{ $certificate_id }}
    </div>

</div>

</body>
</html>